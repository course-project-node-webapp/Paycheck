'use strict';

module.exports = function(app, express, userData, registerControllerLoader) {
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