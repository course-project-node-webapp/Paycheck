const express = require('express');

module.exports = function (app, userData) {
  const loginRouter = new express.Router();

  let loginController = somefunc(userData);
  loginRouter.get('/', loginController.index);


  app.use('/login', loginRouter);
};