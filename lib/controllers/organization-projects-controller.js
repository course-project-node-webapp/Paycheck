/* globals Promise */

'use strict';

const logger = require('../../config/logger');

module.exports = function (organizationsData, projectsData, userData) {
  function index(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    return organizationsData.findById(organizationId)
      .then((organization) => {
        const userRole = organization.getRoleForUser(req.user);

        res.render('./organizations/projects/index', {
          isAuthenticated,
          result: {
            userRole,
            user: req.user,
            organization
          }
        });
      })
      .catch((err) => {
        logger.info(err);
      });
  }

  function createProjectForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    return res.render('./organizations/projects/create', {
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
      return res.redirect('/account/login');
    }

    const newProjectFromInput = req.body;
    const organizationId = req.params.organizationId;

    return organizationsData.findById(organizationId)
      .then((organization) => {
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
        logger.info(err);
        res.redirect(`/organizations/${organizationId}`);
      });
  }

  function projectDetails(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const projectId = req.params.projectId;
    const organizationId = req.params.organizationId;

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId)
    ])
      .then(([organization, project]) => {
        const loggedUser = req.user;
        const userRole = organization.getRoleForUser(loggedUser);

        res.render('./organizations/projects/details', {
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
        logger.info(err);
      });
  }

  function deleteProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.redirect('./error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      return res.redirect('./error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId)
    ])
      .then(([organization, project]) => {
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
        res.redirect(`/organizations/${organizationId}/projects`);
      })
      .catch((err) => {
        logger.info(err.message);
      });
  }

  function listEmployees(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.redirect('./error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      return res.redirect('./error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        const user = req.user;
        const userRole = organization.getRoleForUser(user);

        const project = organization.projects.find(p => p.projectId === projectId);

        res.render('./organizations/projects/employees', {
          isAuthenticated,
          result: {
            user,
            userRole,
            organization,
            project
          }
        });
      })
      .catch((err) => {
        logger.info(err.message);
      });
  }

  function listUnassignedEmployees(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.redirect('./error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      return res.redirect('./error');
    }

    const roleName = req.params.role;
    if (!roleName) {
      return res.redirect('./error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        const user = req.user;
        const userRole = organization.getRoleForUser(user);

        res.render('./organizations/projects/unassigned-employees', {
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
        logger.info(err);
      });
  }

  function addEmployeeToProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.redirect('./error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      return res.redirect('./error');
    }

    const roleName = req.params.role;
    if (!roleName) {
      return res.redirect('./error');
    }

    const userId = req.params.unassignedId;
    if (!userId) {
      return res.redirect('./error');
    }

    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId),
      userData.getUserById(userId)
    ])
      .then(([organization, project, user]) => {
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
        res.redirect(`/organizations/${organizationId}/projects/${projectId}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
      });
  }

  function removeEmployeeFromProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.redirect('./error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      return res.redirect('./error');
    }

    const roleName = req.params.role;
    if (!roleName) {
      return res.redirect('./error');
    }

    const userId = req.params.employeeId;
    if (!userId) {
      return res.redirect('./error');
    }

    // return res.send('I wuz heer');
    return Promise.all([
      organizationsData.findById(organizationId),
      projectsData.getProjectById(projectId),
      userData.getUserById(userId)
    ])
      .then(([organization, project, user]) => {
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
        res.redirect(`/organizations/${organizationId}/projects/${projectId}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
      });
  }

  function listTasks(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.redirect('./error');
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      return res.redirect('./error');
    }

    return organizationsData.findById(organizationId)
      .then((organization) => {
        const user = req.user;
        const project = organization.projects.find(p => p.projectId === projectId);
        let isManager = project.managers.some(m => m.name === user.username);
        if (!isManager) {
          isManager = organization.owners.some(o => o.username === user.username);
        }

        res.render('./organizations/projects/tasks', {
          isAuthenticated,
          result: {
            user,
            organizationId,
            project,
            isManager
          }
        });
      })
      .catch((err) => {
        logger.info(err.message);
        res.redirect(req.path);
      });
  }

  function addTaskForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    const projectId = req.params.projectId;

    return res.render('./organizations/projects/create-task', {
      isAuthenticated,
      result: {
        user: req.user,
        organizationId,
        projectId
      }
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
    addTaskForm
  };
};