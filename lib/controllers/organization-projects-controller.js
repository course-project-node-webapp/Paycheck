/* globals Promise */

'use strict';

module.exports = function (organizationsData, projectsData, userData, logger) {
  function index(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        return res.status(200)
          .render('./organizations/projects/index', {
            isAuthenticated,
            result: {
              user: req.user,
              organization
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function createProjectForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return res.status(200)
      .render('./organizations/projects/create', {
        isAuthenticated,
        result: {
          user: req.user,
          organizationId
        }
      });
  }

  function createProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const newProjectFromInput = req.body;
    if (!newProjectFromInput) {
      return res.status(400).redirect('/error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        newProjectFromInput.organization = organization.name;

        return Promise.all([
          new Promise(resolve => resolve(organization)),
          projectsData.createProject(newProjectFromInput)
        ]);
      })
      .then(([organization, project]) => {
        organization.projects.push({
          name: project.name,
          projectId: project._id,
          description: project.description
        });

        return organizationsData.updateOrganization(organization);
      })
      .then((updatedOrganization) => {
        res.redirect(`/organizations/${updatedOrganization._id}/projects`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect(`/organizations/${organizationId}`);
      });
  }

  function projectDetails(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId)
    ])
      .then(([organization, project]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!project) {
          logger.info(`Organization with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const loggedUser = req.user;
        const userRole = organization.getRoleForUser(loggedUser);

        return res.status(200)
          .render('./organizations/projects/details', {
            isAuthenticated,
            result: {
              user: loggedUser,
              userRole,
              project,
              organizationId
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function deleteProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId)
    ])
      .then(([organization, project]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!project) {
          logger.info(`Organization with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        project.isDeleted = true;
        organization.projects.forEach(p => {
          if (p.projectId === projectId) {
            p.isDeleted = true;
          }
        });

        return Promise.all([
          organizationsData.updateOrganization(organization),
          projectsData.updateProject(project)
        ]);
      })
      .then(() => {
        res.status(200).redirect(`/organizations/${organizationId}/projects`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function listEmployees(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const user = req.user;
        const project = organization.projects.find(p => p.projectId === projectId);
        if (!project) {
          logger.info(`Organization with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        let isManager = project.managers.some(m => m.name === user.username);
        if (!isManager) {
          isManager = organization.owners.some(o => o.username === user.username);
        }

        return res.status(200)
          .render('./organizations/projects/employees', {
            isAuthenticated,
            result: {
              user,
              isManager,
              organization,
              project
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function listUnassignedEmployees(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const roleName = req.params.role;
    if (!roleName) {
      logger.info('Role name not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const user = req.user;
        const userRole = organization.getRoleForUser(user);

        return res.status(200)
          .render('./organizations/projects/unassigned-employees', {
            isAuthenticated,
            result: {
              user,
              userRole,
              organization,
              projectId,
              roleName
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function addEmployeeToProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const roleName = req.params.role;
    if (!roleName) {
      logger.info('Role name not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const userId = req.params.unassignedId;
    if (!userId) {
      logger.info('User ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId),
      userData.getUserById(userId)
    ])
      .then(([organization, project, user]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!project) {
          logger.info(`Project with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!user) {
          logger.info(`Organization with ID: ${userId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const organizationProject = organization.projects.find(p => p.name === project.name);
        if (!organizationProject) {
          return res.redirect('./error');
        }

        const trimmedRoleName = roleName.substr(0, roleName.length - 1);
        organizationProject[roleName].push({
          name: user.username,
          [trimmedRoleName + 'Id']: user._id
        });

        organization.unassigned = organization.unassigned.filter(u => u.username !== user.username);

        project.employees.push({
          employeeName: user.username,
          employeeId: user._id,
          role: roleName
        });

        user.projects.push({
          name: project.name,
          description: project.description
        });

        return Promise.all([
          organizationsData.updateOrganization(organization),
          projectsData.updateProject(project),
          userData.updateUser(user)
        ]);
      })
      .then(() => {
        res.status(200).redirect(`/organizations/${organizationId}/projects/${projectId}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function removeEmployeeFromProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const roleName = req.params.role;
    if (!roleName) {
      logger.info('Role name not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const userId = req.params.unassignedId;
    if (!userId) {
      logger.info('User ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId),
      userData.getUserById(userId)
    ])
      .then(([organization, project, user]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!project) {
          logger.info(`Project with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!user) {
          logger.info(`Organization with ID: ${userId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const organizationProject = organization.projects.find(p => p.name === project.name);
        if (!organizationProject) {
          return res.redirect('./error');
        }

        organizationProject[roleName] = organizationProject[roleName].filter(e => e.name !== user.username);
        organization.unassigned.push({
          username: user.username,
          unassignedId: user._id
        });

        user.projects = user.projects.filter(p => p.name !== project.name);
        project.employees = project.employees.filter(e => e.employeeName !== user.username);

        return Promise.all([
          organizationsData.updateOrganization(organization),
          projectsData.updateProject(project),
          userData.updateUser(user)
        ]);
      })
      .then(() => {
        res.status(200).redirect(`/organizations/${organizationId}/projects/${projectId}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function listTasks(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const user = req.user;
        const project = organization.projects.find(p => p.projectId === projectId);
        if (!project) {
          logger.info(`Project with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        let isManager = project.managers.some(m => m.name === user.username);
        if (!isManager) {
          isManager = organization.owners.some(o => o.username === user.username);
        }

        return res.status(200)
          .render('./organizations/projects/tasks', {
            isAuthenticated,
            result: {
              user,
              organizationId,
              projectId,
              project,
              isManager
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function addTaskForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    return res.status(200)
      .render('./organizations/projects/create-task', {
        isAuthenticated,
        result: {
          user: req.user,
          organizationId,
          projectId
        }
      });
  }

  function addTask(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      logger.info('Orgnization ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      logger.info('Project ID not found in request parameters.');
      return res.status(400).redirect('/error');
    }

    const newTask = req.body;
    if (!newTask) {
      logger.info('Task information not found in request body.');
      return res.status(400).redirect('/error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId)
    ])
      .then(([organization, project]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!project) {
          logger.info(`Project with ID: ${projectId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        const organizationProject = organization.projects.find(p => p.name === project.name);
        organizationProject.tasks.push({
          name: newTask.name,
          description: newTask.description
        });

        return organizationsData.updateOrganization(organization);
      })
      .then(() => {
        res.status(200).redirect(`/organizations/${organizationId}/projects/${projectId}/tasks`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  return {
    index,
    createProjectForm,
    createProject,
    projectDetails,
    deleteProject,
    listEmployees,
    listUnassignedEmployees,
    addEmployeeToProject,
    removeEmployeeFromProject,
    listTasks,
    addTaskForm,
    addTask
  };
};