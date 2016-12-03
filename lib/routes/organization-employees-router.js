'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    userData,
    organizationsData
  } = data;

  const {
    organizationEmployeesControllerLoader
  } = controllerLoaders;

  const organizationEmployeesController = organizationEmployeesControllerLoader(organizationsData, userData);
  const organizationEmployeesRouter = new express.Router();
  organizationEmployeesRouter
    .get('/:organizationId/remove-employee/:employeeId/role/:role', organizationEmployeesController.removeEmployee)
    .get('/:organizationId/add-employee/:employeeId', organizationEmployeesController.addEmployee)
    .get('/:organizationId/add-employee', organizationEmployeesController.addEmployeeForm)
    .get('/:organizationId/employees', organizationEmployeesController.index);

  app.use('/organizations', organizationEmployeesRouter);
};