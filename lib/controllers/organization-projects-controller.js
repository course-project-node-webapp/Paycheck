/* globals Promise */

'use strict';

const logger = require('../../config/logger');

module.exports = function (organizationsData, projectsData) {
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
      });
  }

  function projectDetails(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const projectId = req.params.projectId;
    const organizationId = req.params.organizationId;

    return projectsData.getProjectById(projectId)
      .then((project) => {
        res.render('./organizations/projects/details', {
          isAuthenticated,
          result: {
            user: req.user,
            project,
            organizationId
          }
        });
      })
      .catch((err) => {
        logger.info(err);
      });
  }

  return {
    index,
    createProjectForm,
    createProject,
    projectDetails
  };
};