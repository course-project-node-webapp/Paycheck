module.exports = function (app, express, userData) {
  const passport = require('passport');

  let loginController;
  const loginRouter = new express.Router();
  loginRouter
    .get('/', (req, res) => {
      if (!loginController) {
        loginController = lazyLoadLoginController(userData);
      }

      loginController.index(req, res);
    })
    .post('/', passport.authenticate('local'), (req, res) => {
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