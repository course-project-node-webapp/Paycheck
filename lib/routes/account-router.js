'use strict';

module.exports = function(app, express, userData) {
  const passport = require('passport');

  let accountController = false;
  const loginRouter = new express.Router();
  loginRouter
    .get('/login', (req, res) => {
      if (!accountController) {
        accountController = lazyLoadAccountController(userData);
      }

      accountController.index(req, res);
    })
    .post('/login', passport.authenticate('local'), (req, res) => {
      if (!accountController) {
        accountController = lazyLoadAccountController(userData);
      }

      accountController.redirectOnSuccess(req, res);
    })
    .get('/logout', (req, res) => {
      if (!accountController) {
        accountController = lazyLoadAccountController(userData);
      }

      accountController.logOut(req, res);
    });

  app.use('/account', loginRouter);
};

function lazyLoadAccountController(userData) {
  const accountController = require('../controllers/account-controller')(userData);
  return accountController;
}