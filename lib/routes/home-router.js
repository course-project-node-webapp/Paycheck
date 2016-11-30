'use strict';

module.exports = function ({app, express, controllerLoaders}) {
  const homeRouter = new express.Router();
  // const homeController = require('../controllers/home-controller')();
  const {
    homeControllerLoader
  } = controllerLoaders;

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