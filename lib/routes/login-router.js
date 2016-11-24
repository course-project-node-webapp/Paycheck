const express = require('express');

module.exports = function (app, userData) {
  const loginRouter = new express.Router();
  const loginController = require('../controllers/login-controller')(userData);

  loginRouter.get('/', loginController.index);

  app.use('/login', loginRouter);
};