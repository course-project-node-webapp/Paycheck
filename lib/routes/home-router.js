'use strict';

module.exports = function ({app, express, controllerLoaders}) {
  const {
    homeControllerLoader
  } = controllerLoaders;

  const homeRouter = new express.Router();
  let homeController;
  homeRouter
    .get('/', (req, res) => {
      if (!homeController) {
        homeController = homeControllerLoader();
      }

      homeController.index(req, res);
    });

  app.use('/', homeRouter);
};