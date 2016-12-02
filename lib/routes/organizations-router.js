'use strict';

module.exports = function ({ app, express, data, controllerLoaders }) {
  const {
    organizationsData,
    userData
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
    .get('/search', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData);
      }

      organizationsController.search(req, res);
    })
    .get('/:organizationId/apply', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.applyForm(req, res);
    })
    .post('/:organizationId/apply', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      // TODO: 
      res.send();
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