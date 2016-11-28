'use strict';

module.exports = function (app, express, organizationsData, userData) {
  let organizationsController = false;
  const organizationsRouter = new express.Router();
  organizationsRouter
    .get('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.createOrganizationForm(req, res);
    })
    .post('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.createOrganization(req, res);
    })
    .get('/:organizationId/remove-employee/:employeeId', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.addEmployee(req, res);
    })
    .get('/:organizationId/add-employee/:employeeId', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.addEmployee(req, res);
    })
    .get('/:organizationId/add-employee', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.addEmployeeForm(req, res);
    })
    .get('/:organizationId', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.details(req, res);
    })
    .get('/', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData, userData);
      }

      organizationsController.index(req, res);
    });

  app.use('/organizations', organizationsRouter);
};

function lazyLoadOrganizationsController(organizationsData, userData) {
  const organizationsController = require('../controllers/oragnizations-controller')(organizationsData, userData);
  return organizationsController;
}