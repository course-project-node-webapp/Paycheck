'use strict';
module.exports = function (app, express, userData) {
  let registerController = false;
  const registerRouter = new express.Router();
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

function lazyLoadRegisterController(userData) {
  const registerController = require('../controllers/register-controller')(userData);
  return registerController;
}