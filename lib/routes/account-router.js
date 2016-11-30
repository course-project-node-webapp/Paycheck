'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const passport = require('passport');

  const {
    userData
  } = data;

  const {
    accountControllerLoader
  } = controllerLoaders;

  let accountController = false;
  const loginRouter = new express.Router();
  loginRouter
    .get('/login', (req, res) => {
      if (!accountController) {
        accountController = accountControllerLoader(userData);
      }

      accountController.index(req, res);
    })
    .post('/login', passport.authenticate('local'), (req, res) => {
      if (!accountController) {
        accountController = accountControllerLoader(userData);
      }

      accountController.redirectOnSuccess(req, res);
    })
    .get('/logout', (req, res) => {
      if (!accountController) {
        accountController = accountControllerLoader(userData);
      }

      accountController.logOut(req, res);
    })
    .get('/:userId', (req, res) => {
      if (!accountController) {
        accountController = accountControllerLoader(userData);
      }

      accountController.userDetails(req, res);
    });

  app.use('/account', loginRouter);
};