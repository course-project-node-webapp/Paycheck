'use strict';

module.exports = function ({ app, express, data, controllerLoaders, logger }) {
  const {
    organizationsData,
    userData
  } = data;

  const {
    organizationsControllerLoader
  } = controllerLoaders;

  let organizationsController = organizationsControllerLoader({ organizationsData, userData, logger });
  const organizationsRouter = new express.Router();
  organizationsRouter
    .get('/create', organizationsController.createOrganizationForm)
    .post('/create', organizationsController.createOrganization)
    .get('/search', organizationsController.search)
    .get('/:organizationId/applications/decline/:userId', organizationsController.declineApplication)
    .get('/:organizationId/applications/approve/:userId', organizationsController.approveApplication)
    .get('/:organizationId/applications', organizationsController.listApplications)
    .get('/:organizationId/apply', organizationsController.applyForm)
    .post('/:organizationId/apply', organizationsController.addApplication)
    .get('/:organizationId', organizationsController.details)
    .get('/', organizationsController.index);

  app.use('/organizations', organizationsRouter);
};