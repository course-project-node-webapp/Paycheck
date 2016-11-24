'use strict';
module.exports = function (app, express, userData) {
  const registerController = require('../controllers/register-controller')(userData);
  const registerRouter = new express.Router();

  registerRouter
    .get('/', registerController.index)
    .put('/', registerController.register);

  app.use('/register', registerRouter);
};