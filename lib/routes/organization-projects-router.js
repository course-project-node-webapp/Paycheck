'use strict';

module.exports = function (app, express, organizationsData) {

  let organizationProjectsController;
  const organizationProjectsRouter = new express.Router();
  organizationProjectsRouter
    .get('/', (req, res) => {
      if (!organizationProjectsController) {
        organizationProjectsController = lazyLoadOrganizationProjectsController(organizationsData);
      }

      organizationProjectsController.index(req, res);
    });

  app.use('/organizations/:organizationId', organizationProjectsRouter);
};

function lazyLoadOrganizationProjectsController(organizationsData) {
  const organizationProjectsController = require('../controllers/organization-projects-controller')(organizationsData);
  return organizationProjectsController;
}