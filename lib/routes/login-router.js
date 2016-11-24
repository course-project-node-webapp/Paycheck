const express = require('express');
const passport = require('passport');

module.exports = function (app, userData) {
  const loginRouter = new express.Router();
  const loginController = require('../controllers/login-controller')(userData);

  loginRouter
    .get('/', loginController.index)
    .post('/', passport.authenticate('local'), (req, res) => {
      res
        .status(200)
        .json({
          redirectUrl: '/profile',
          message: `Welcome ${req.user.username}`
        });
    })
    .put('/', (req, res) => {
      const user = req.body;

      userData.createUser(user)
        .then((createdUser) => {
          res
            .status(201)
            .json({
              redirectUrl: '/profile',
              message: `Welcome ${createdUser.username}`
            });
        })
        .catch((err) => {
          res
            .status(400)
            .sent(err.message);
        });
    });

  app.use('/login', loginRouter);
};