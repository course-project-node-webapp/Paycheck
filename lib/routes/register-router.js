'use strict';
module.exports = function (app, express, controllerLoader, userData) {
  const registerRouter = new express.Router();

  let registerController = false;
  registerRouter
    .get('/', (req, res) => {
      if (!registerController) {
        registerController = lazyLoadRegisterController(controllerLoader, userData);
      }

      registerController.index(req, res);
    })
    .put('/', (req, res) => {
      if (!registerController) {
        registerController = lazyLoadRegisterController(controllerLoader, userData);
      }

      registerController.register(req, res);
    });

  app.use('/register', registerRouter);
};

function lazyLoadRegisterController(controllerLoader, userData) {
  const registerController = controllerLoader.registerController(userData);
  return registerController;
}