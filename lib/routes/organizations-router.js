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
    .get('/:organizationId/applications/decline/:userId', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.declineApplication(req, res);
    })
    .get('/:organizationId/applications/approve/:userId', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.approveApplication(req, res);
    })
    .get('/:organizationId/applications', (req, res) => {
      if (!organizationsController) {
        organizationsController = organizationsControllerLoader(organizationsData, userData);
      }

      organizationsController.listApplications(req, res);
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

      organizationsController.addApplication(req, res);
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