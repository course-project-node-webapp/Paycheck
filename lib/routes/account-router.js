'use strict';

module.exports = function (app, express, userData) {
  const passport = require('passport');

  let loginController = false;
  const loginRouter = new express.Router();
  loginRouter
    .get('/login', (req, res) => {
      if (!loginController) {
        loginController = lazyLoadLoginController(userData);
      }

      loginController.index(req, res);
    })
    .post('/login', passport.authenticate('local'), (req, res) => {
      if (!loginController) {
        loginController = lazyLoadLoginController(userData);
      }

      loginController.redirectOnSuccess(req, res);
    });

  app.use('/account', loginRouter);
};

function lazyLoadLoginController(userData) {
  const loginController = require('../controllers/login-controller')(userData);
  return loginController;
}