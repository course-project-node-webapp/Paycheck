module.exports = function (app, express, userData) {
  const passport = require('passport');
  const loginRouter = new express.Router();
  const loginController = require('../controllers/login-controller')(userData);

  loginRouter
    .get('/', loginController.index)
    .post('/', passport.authenticate('local'), loginController.redirectOnSuccess);

  app.use('/login', loginRouter);
};