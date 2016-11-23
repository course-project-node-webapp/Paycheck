const express = require('express');
const homeController = require('../controllers/home-controller');

module.exports = function (app) {
  const homeRouter = new express.Router();

  homeRouter.get('/', homeController.index);

  app.use('/', homeRouter);
};
