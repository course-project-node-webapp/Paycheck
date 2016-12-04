'use strict';

module.exports = function ({app, express, data, controllerLoaders, logger}) {
  const {
    contactControllerLoader
  } = controllerLoaders;

  const {
    contactData
  } = data;

  const contactController = contactControllerLoader(contactData, logger);

  const contactRouter = new express.Router();
  contactRouter
    .get('/all', contactController.all)
    .get('/', contactController.index)
    .post('/', contactController.addMessage);

  app.use('/contact', contactRouter);
};