'use strict';

module.exports = function ({ app, express, data, controllerLoaders, logger, parametersValidator }) {
  const passport = require('passport');

  const {
    userData
  } = data;

  const {
    accountControllerLoader,
    accountUpdateControllerLoader,
    registerControllerLoader
  } = controllerLoaders;

  const accountController = accountControllerLoader(userData, logger);
  const registerController = registerControllerLoader(userData, logger);
  const accountUpdateController = accountUpdateControllerLoader(userData, logger);

  const accountRouter = new express.Router();
  accountRouter
    .get('/login/facebook', passport.authenticate('facebook'))
    .get('/login/facebook/callback', passport.authenticate('facebook'), (req, res) => res.send('succes fb'))
    .get('/login', accountController.index)
    .post('/login', passport.authenticate('local'), accountController.redirectOnSuccess)
    .get('/logout', accountController.logOut)
    .get('/register', registerController.index)
    .get('/settings', accountController.settings)
    .put('/register', registerController.register)
    .put('/update', accountUpdateController.update)
    .put('/update/skills/add', accountUpdateController.addSkill)
    .put('/update/skills/remove', accountUpdateController.removeSkill)
    .put('/update/summary', accountUpdateController.updateSummary)
    .put('/update/specialty', accountUpdateController.updateSpecialty)
    .get('/:userId', parametersValidator, accountController.userDetails);

  app.use('/account', accountRouter);
};