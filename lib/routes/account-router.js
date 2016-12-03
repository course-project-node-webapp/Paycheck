'use strict';

module.exports = function ({ app, express, data, controllerLoaders }) {
  const passport = require('passport');

  const {
    userData
  } = data;

  const {
    accountControllerLoader,
    accountUpdateControllerLoader,
    registerControllerLoader
  } = controllerLoaders;

  const accountController = accountControllerLoader(userData);
  const registerController = registerControllerLoader(userData);
  const accountUpdateController = accountUpdateControllerLoader(userData);

  const accountRouter = new express.Router();
  accountRouter
    .get('/login', accountController.index)
    .post('/login', passport.authenticate('local'), accountController.redirectOnSuccess)
    .get('/logout', accountController.logOut)
    .get('/register/', registerController.index)
    .put('/register/', registerController.register)
    .put('/update/skills/add', accountUpdateController.addSkill)
    .put('/update/skills/remove', accountUpdateController.removeSkill)
    .put('/update/summary', accountUpdateController.updateSummary)
    .put('/update/specialty', accountUpdateController.updateSpecialty)
    .get('/:userId', accountController.userDetails);

  app.use('/account', accountRouter);
};