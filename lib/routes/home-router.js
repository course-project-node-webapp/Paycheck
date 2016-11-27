'use strict';

module.exports = function (app, express) {
  const homeRouter = new express.Router();
  const homeController = require('../controllers/home-controller');

  homeRouter
    .get('/', homeController.index)
    .get('/latest', homeController.latest);

  app.use('/', homeRouter);
};