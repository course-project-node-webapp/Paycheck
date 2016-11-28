'use strict';

module.exports = function (app, express, organizationsData) {
  let organizationsController = false;
  const organizationsRouter = new express.Router();
  organizationsRouter
    .get('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData);
      }

      organizationsController.createOrganizationForm(req, res);
    })
    .post('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData);
      }

      organizationsController.createOrganization(req, res);
    })
    .get('/:organizationId', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData);
      }

      organizationsController.details(req, res);
    })
    .get('/', (req, res) => {
      if (!organizationsController) {
        organizationsController = lazyLoadOrganizationsController(organizationsData);
      }

      organizationsController.index(req, res);
    });

  app.use('/organizations', organizationsRouter);
};

function lazyLoadOrganizationsController(organizationsData) {
  const organizationsController = require('../controllers/oragnizations-controller')(organizationsData);
  return organizationsController;
}