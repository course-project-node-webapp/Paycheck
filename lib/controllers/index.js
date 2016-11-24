'use strict';

const homeController = require('./home-controller');
const userController = require('./users-controller');
const projectController = require('./project-controller');

module.exports = {
  home: homeController,
  user: userController,
  project: projectController
};