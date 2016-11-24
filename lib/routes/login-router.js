const express = require('express');
const passport = require('passport');
module.exports = function (app, userData) {
  const loginRouter = new express.Router();
  const loginController = require('../controllers/login-controller')(userData);

  loginRouter
    .get('/', loginController.index)
    .post('/', passport.authenticate('local', {
      failureRedirect: '/'
    }), (req, res) => {
      res.send('success');
    });
  app.use('/login', loginRouter);
};