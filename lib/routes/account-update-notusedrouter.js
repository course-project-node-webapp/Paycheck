'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    userData
  } = data;

  const {
    accountUpdateControllerLoader
  } = controllerLoaders;

  const accountUpdateController = accountUpdateControllerLoader(userData);
  const accountUpdateRouter = new express.Router();
  accountUpdateRouter
    .put('/skills', accountUpdateController.addSkill);

  app.use('/account/update', accountUpdateRouter);
};