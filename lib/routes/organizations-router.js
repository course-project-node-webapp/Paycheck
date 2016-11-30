'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    organizationsData
  } = data;

  const {
    organizationsControllerLoader
  } = controllerLoaders;

  let organizationsController = false;
  const organizationsRouter = new express.Router();
  organizationsRouter
    .get('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData);
      }

      organizationsController.createOrganizationForm(req, res);
    })
    .post('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData);
      }

      organizationsController.createOrganization(req, res);
    })
    .get('/:organizationId', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData);
      }

      organizationsController.details(req, res);
    })
    .get('/', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData);
      }

      organizationsController.index(req, res);
    });

  app.use('/organizations', organizationsRouter);
};