'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    organizationProjectsControllerLoader
  } = controllerLoaders;

  let organizationProjectsController;
  const organizationProjectsRouter = new express.Router();
  organizationProjectsRouter
    .get('/:organizationId/projects/delete/:projectId', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.deleteProject(req, res);
    })
    .get('/:organizationId/projects/create', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.createProjectForm(req, res);
    })
    .post('/:organizationId/projects/create', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.createProject(req, res);
    })
    .get('/:organizationId/projects/:projectId/employees/add/:role', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.listUnassignedEmployees(req, res);
    })
    .get('/:organizationId/projects/:projectId/employees/add/:unassignedId/:role', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.addEmployeeToProject(req, res);
    })
    .get('/:organizationId/projects/:projectId/employees/remove/:employeeId/:role', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      // TODO:
    })
    .get('/:organizationId/projects/:projectId/employees', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.listEmployees(req, res);
    })
    .get('/:organizationId/projects/:projectId/tasks', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      // TODO: 
    })
    .get('/:organizationId/projects/:projectId', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.projectDetails(req, res);
    })
    .get('/:organizationId/projects', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = getOrganizationProjectsController({ data, organizationProjectsControllerLoader });
      }

      organizationProjectsController.index(req, res);
    });

  app.use('/organizations', organizationProjectsRouter);
};

function getOrganizationProjectsController({data, loader}) {
  const {
    projectsData,
    organizationsData,
    userData
  } = data;

  return loader(organizationsData, projectsData, userData);
}