'use strict';

module.exports = function() {
  const accountControllerLoader = require('./account-controller');
  const accountUpdateControllerLoader = require('./account-update-controller');
  const homeControllerLoader = require('./home-controller');
  const organizationEmployeesControllerLoader = require('./organization-employees-controller');
  const organizationProjectsControllerLoader = require('./organization-projects-controller');
  const organizationsControllerLoader = require('./organizations-controller');
  const profileControllerLoader = require('./profile-controller');
  const projectControllerLoader = require('./project-controller');
  const registerControllerLoader = require('./register-controller');
  const userControllerLoader = require('./users-controller');

  return {
    accountControllerLoader,
    accountUpdateControllerLoader,
    homeControllerLoader,
    organizationEmployeesControllerLoader,
    organizationProjectsControllerLoader,
    organizationsControllerLoader,
    profileControllerLoader,
    registerControllerLoader,
    projectControllerLoader,
    userControllerLoader
  };
};