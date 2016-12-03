'use strict';

module.exports = function({ app, express, data, controllerLoaders }) {
  const passport = require('passport');

  const {
    userData
  } = data;

  const {
    accountControllerLoader,
    accountUpdateControllerLoader,
    registerControllerLoader
  } = controllerLoaders;

  let accountController = false;
  let registerController = false;
  let accountUpdateController = false;

  const accountRouter = new express.Router();
  accountRouter
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
    .get('/register/', (req, res) => {
      if (!registerController) {
        registerController = registerControllerLoader(userData);
      }

      registerController.index(req, res);
    })
    .put('/register/', (req, res) => {
      if (!registerController) {
        registerController = registerControllerLoader(userData);
      }

      registerController.register(req, res);
    })
    .put('/update/skills/add', (req, res) => {
      if (!accountUpdateController) {
        accountUpdateController = accountUpdateControllerLoader(userData);
      }

      accountUpdateController.addSkill(req, res);
    })
    .put('/update/skills/remove', (req, res) => {
      if (!accountUpdateController) {
        accountUpdateController = accountUpdateControllerLoader(userData);
      }

      accountUpdateController.removeSkill(req, res);
    })
    .put('/update/summary', (req, res) => {
      if (!accountUpdateController) {
        accountUpdateController = accountUpdateControllerLoader(userData);
      }

      accountUpdateController.updateSummary(req, res);
    })
    .put('/update/specialty', (req, res) => {
      if (!accountUpdateController) {
        accountUpdateController = accountUpdateControllerLoader(userData);
      }

      accountUpdateController.updateSpecialty(req, res);
    })
    .get('/:userId', (req, res) => {
      if (!accountController) {
        accountController = accountControllerLoader(userData);
      }

      accountController.userDetails(req, res);
    });

  app.use('/account', accountRouter);
};