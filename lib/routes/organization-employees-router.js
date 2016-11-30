'use strict';

module.exports = function (app, express, organizationsData, userData) {
  let organizationEmployeesController;
  const organizationEmployeesRouter = new express.Router();
  organizationEmployeesRouter
    .get('/:organizationId/remove-employee/:employeeId/role/:role', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = lazyLoadOrganizationEmployeesController(organizationsData, userData);
      }

      organizationEmployeesController.removeEmployee(req, res);
    })
    .get('/:organizationId/add-employee/:employeeId', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = lazyLoadOrganizationEmployeesController(organizationsData, userData);
      }

      organizationEmployeesController.addEmployee(req, res);
    })
    .get('/:organizationId/add-employee', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = lazyLoadOrganizationEmployeesController(organizationsData, userData);
      }

      organizationEmployeesController.addEmployeeForm(req, res);
    })
    .get('/:organizationId/employees', (req, res) => {
      if (!organizationEmployeesController) {
        organizationEmployeesController = lazyLoadOrganizationEmployeesController(organizationsData, userData);
      }

      organizationEmployeesController.index(req, res);
    });

  app.use('/organizations', organizationEmployeesRouter);
};

function lazyLoadOrganizationEmployeesController(organizationsData, userData) {
  const organizationEmployeesController = require('../controllers/organization-employees-controller')(organizationsData, userData);
  return organizationEmployeesController;
}