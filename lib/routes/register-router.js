'use strict';
module.exports = function (app, express, userData) {
  const registerRouter = new express.Router();

  let registerController = false;
  registerRouter
    .get('/', (req, res) => {
      if (!registerController) {
        registerController = lazyLoadRegisterController(userData);
      }

      registerController.index(req, res);
    })
    .put('/', (req, res) => {
      if (!registerController) {
        registerController = lazyLoadRegisterController(userData);
      }

      registerController.register(req, res);
    });

  app.use('/register', registerRouter);
};

function lazyLoadRegisterController(controllerLoader, userData) {
  const registerController = require('../controllers/register-controller')(userData);
  return registerController;
}