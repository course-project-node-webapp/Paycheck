'use strict';

module.exports = function ({app, express, controllerLoaders}) {
  const {
    contactControllerLoader
  } = controllerLoaders;

  const contactController = contactControllerLoader();

  const contactRouter = new express.Router();
  contactRouter
    .get('/all', contactController.all)
    .get('/', contactController.index)
    .post('/', contactController.addMessage);

  app.use('/contact', contactRouter);
};