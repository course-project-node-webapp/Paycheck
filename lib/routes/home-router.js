'use strict';

module.exports = function ({app, express, controllerLoaders}) {
  const {
    homeControllerLoader
  } = controllerLoaders;

  const homeController = homeControllerLoader();
  const homeRouter = new express.Router();
  homeRouter
    .get('/', homeController.index);

  app.use('/', homeRouter);
};