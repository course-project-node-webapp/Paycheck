'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    userData
  } = data;

  const {
    registerControllerLoader
  } = controllerLoaders;

  let registerController = false;
  const registerRouter = new express.Router();
  registerRouter
    .get('/', (req, res) => {
      if (!registerController) {
        registerController = registerControllerLoader(userData);
      }

      registerController.index(req, res);
    })
    .put('/', (req, res) => {
      if (!registerController) {
        registerController = registerControllerLoader(userData);
      }

      registerController.register(req, res);
    });

  app.use('/account/register', registerRouter);
};