'use strict';

module.exports = function (app, express, homeControllerLoader) {
  const homeRouter = new express.Router();
  // const homeController = require('../controllers/home-controller')();

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