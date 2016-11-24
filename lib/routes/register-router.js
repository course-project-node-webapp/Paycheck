'use strict';
module.exports = function (app, express, userData) {
  const regiesterController = require('../controllers/register-controller')(userData);
  const registerRouter = new express.Router();

  registerRouter
    .get('/', regiesterController.index);

  app.use('/register', registerRouter);
};