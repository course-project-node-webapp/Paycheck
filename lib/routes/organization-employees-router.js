'use strict';

module.exports = function (app, express, organizationsData, userData, organizationEmployeesControllerLoader) {
  let organizationEmployeesController;
  const organizationEmployeesRouter = new express.Router();
  organizationEmployeesRouter
    .get('/:organizationId/remove-employee/:employeeId/role/:role', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = organizationEmployeesControllerLoader(organizationsData, userData);
      }

      organizationEmployeesController.removeEmployee(req, res);
    })
    .get('/:organizationId/add-employee/:employeeId', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = organizationEmployeesControllerLoader(organizationsData, userData);
      }

      organizationEmployeesController.addEmployee(req, res);
    })
    .get('/:organizationId/add-employee', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = organizationEmployeesControllerLoader(organizationsData, userData);
      }

      organizationEmployeesController.addEmployeeForm(req, res);
    })
    .get('/:organizationId/employees', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = organizationEmployeesControllerLoader(organizationsData, userData);
      }

      organizationEmployeesController.index(req, res);
    });

  app.use('/organizations', organizationEmployeesRouter);
};