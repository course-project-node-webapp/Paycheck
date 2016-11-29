'use strict';

const logger = require('../../config/logger');

module.exports = function (organizationsData) {
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
        organization.projects.push(newProjectFromInput);
        return organizationsData.updateOrganization(organization);
      })
      .then((updatedOrganization) => {
        res.redirect(`/organizations/${updatedOrganization._id}/projects`);
      })
      .catch((err) => {
        logger.info(err);
      });
  }

  return {
    index,
    createProjectForm,
    createProject
  };
};