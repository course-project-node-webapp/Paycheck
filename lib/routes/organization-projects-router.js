'use strict';

module.exports = function (app, express, organizationsData, projectsData) {

  let organizationProjectsController;
  const organizationProjectsRouter = new express.Router();
  organizationProjectsRouter
    .get('/:organizationId/projects/delete/:projectId', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = lazyLoadOrganizationProjectsController(organizationsData, projectsData);
      }

      organizationProjectsController.deleteProject(req, res);
    })
    .get('/:organizationId/projects/create', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = lazyLoadOrganizationProjectsController(organizationsData, projectsData);
      }

      organizationProjectsController.createProjectForm(req, res);
    })
    .post('/:organizationId/projects/create', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = lazyLoadOrganizationProjectsController(organizationsData, projectsData);
      }

      organizationProjectsController.createProject(req, res);
    })
    .get('/:organizationId/projects/:projectId', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = lazyLoadOrganizationProjectsController(organizationsData, projectsData);
      }

      organizationProjectsController.projectDetails(req, res);
    })
    .get('/:organizationId/projects', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = lazyLoadOrganizationProjectsController(organizationsData, projectsData);
      }

      organizationProjectsController.index(req, res);
    });

  app.use('/organizations', organizationProjectsRouter);
};

function lazyLoadOrganizationProjectsController(organizationsData, projectsData) {
  const organizationProjectsController = require('../controllers/organization-projects-controller')(organizationsData, projectsData);
  return organizationProjectsController;
}