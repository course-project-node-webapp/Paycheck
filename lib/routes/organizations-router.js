'use strict';

module.exports = function (app, express, organizationsData) {
  let organizationsController = false;
  const organizationsRouter = new express.Router();
  organizationsRouter
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