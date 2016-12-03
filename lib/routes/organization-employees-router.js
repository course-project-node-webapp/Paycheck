'use strict';

module.exports = function ({app, express, data, controllerLoaders, logger, parametersValidator}) {
  const {
    userData,
    organizationsData
  } = data;

  const {
    organizationEmployeesControllerLoader
  } = controllerLoaders;

  const organizationEmployeesController = organizationEmployeesControllerLoader(organizationsData, userData, logger);
  const organizationEmployeesRouter = new express.Router();
  organizationEmployeesRouter
    .get('/:organizationId/remove-employee/:employeeId/role/:role', parametersValidator, organizationEmployeesController.removeEmployee)
    .get('/:organizationId/add-employee/:employeeId', parametersValidator, organizationEmployeesController.addEmployee)
    .get('/:organizationId/add-employee', organizationEmployeesController.addEmployeeForm)
    .get('/:organizationId/employees', organizationEmployeesController.index);

  app.use('/organizations', organizationEmployeesRouter);
};