'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    userData,
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
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.createOrganizationForm(req, res);
    })
    .post('/create', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.createOrganization(req, res);
    })
    .get('/:organizationId', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.details(req, res);
    })
    .get('/', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.index(req, res);
    });

  app.use('/organizations', organizationsRouter);
};