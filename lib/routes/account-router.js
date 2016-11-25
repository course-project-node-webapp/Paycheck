'use strict';

module.exports = function (app, express, userData) {
  const passport = require('passport');

  let loginController = false;
  const loginRouter = new express.Router();
  loginRouter
    .get('/sign-in', (req, res) => {
      if (!loginController) {
        loginController = lazyLoadLoginController(userData);
      }

      loginController.index(req, res);
    })
    .post('/logout', passport.authenticate('local'), (req, res) => {
      if (!loginController) {
        loginController = lazyLoadLoginController(userData);
      }

      loginController.redirectOnSuccess(req, res);
    });

  app.use('/login', loginRouter);
};

function lazyLoadLoginController(userData) {
  const loginController = require('../controllers/login-controller')(userData);
  return loginController;
}