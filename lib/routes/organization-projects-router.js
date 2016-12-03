'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    organizationProjectsControllerLoader
  } = controllerLoaders;

  const {
    projectsData,
    organizationsData,
    userData
  } = data;

  const organizationProjectsController = organizationProjectsControllerLoader(organizationsData, projectsData, userData);
  const organizationProjectsRouter = new express.Router();
  organizationProjectsRouter
    .get('/:organizationId/projects/delete/:projectId', organizationProjectsController.deleteProject)
    .get('/:organizationId/projects/create', organizationProjectsController.createProjectForm)
    .post('/:organizationId/projects/create', organizationProjectsController.createProject)
    .get('/:organizationId/projects/:projectId/tasks/add', organizationProjectsController.addTaskForm)
    .post('/:organizationId/projects/:projectId/tasks/add', organizationProjectsController.addTask)
    .get('/:organizationId/projects/:projectId/tasks/:taskId', (req, res) => { res.send('I WUZ HERE!'); }) //TODO:
    .get('/:organizationId/projects/:projectId/tasks', organizationProjectsController.listTasks)
    .get('/:organizationId/projects/:projectId/employees/add/:role', organizationProjectsController.listUnassignedEmployees)
    .get('/:organizationId/projects/:projectId/employees/add/:unassignedId/:role', organizationProjectsController.addEmployeeToProject)
    .get('/:organizationId/projects/:projectId/employees/remove/:employeeId/:role', organizationProjectsController.removeEmployeeFromProject)
    .get('/:organizationId/projects/:projectId/employees', organizationProjectsController.listEmployees)
    .get('/:organizationId/projects/:projectId/tasks', (req, res) => { res.send('TODO'); })
    .get('/:organizationId/projects/:projectId', organizationProjectsController.projectDetails)
    .get('/:organizationId/projects', organizationProjectsController.index);

  app.use('/organizations', organizationProjectsRouter);
};

