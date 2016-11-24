const express = require('express');
const passport = require('passport');
module.exports = function (app, userData) {
  const loginRouter = new express.Router();
  const loginController = require('../controllers/login-controller')(userData);

  loginRouter
    .get('/', loginController.index)
    .post('/', passport.authenticate('local', (err, user) => {
      
    }), (req, res) => {
      res.send('hello');
    });
    
  app.use('/login', loginRouter);
};