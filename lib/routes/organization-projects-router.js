'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    projectsData,
    organizationsData
  } = data;

  const {
    organizationProjectsControllerLoader
  } = controllerLoaders;

  let organizationProjectsController;
  const organizationProjectsRouter = new express.Router();
  organizationProjectsRouter
    .get('/:organizationId/projects/delete/:projectId', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      organizationProjectsController.deleteProject(req, res);
    })
    .get('/:organizationId/projects/create', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      organizationProjectsController.createProjectForm(req, res);
    })
    .post('/:organizationId/projects/create', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      organizationProjectsController.createProject(req, res);
    })
    .get('/:organizationId/projects/:projectId/employees', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      organizationProjectsController.listEmployees(req, res);
    })
    .get('/:organizationId/projects/:projectId/tasks', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      // TODO: 
    })
    .get('/:organizationId/projects/:projectId', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      organizationProjectsController.projectDetails(req, res);
    })
    .get('/:organizationId/projects', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData);
      }

      organizationProjectsController.index(req, res);
    });

  app.use('/organizations', organizationProjectsRouter);
};