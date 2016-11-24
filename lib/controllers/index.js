'use strict';

module.exports = function (data) {
  const homeController = require('./home-controller');
  const loginController = require('./login-controller');
  const profileController = require('./profile-controller');
  const projectController = require('./project-controller');
  const registerController = require('./register-controller');
  const userController = require('./users-controller');

  return {
    homeController,
    loginController,
    profileController,
    registerController,
    projectController,
    userController
  };
};