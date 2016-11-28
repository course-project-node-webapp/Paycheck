'use strict';

module.exports = function () {
  const User = require('./user-model');
  const Project = require('./project-model');
  const Organization = require('./organization-model');

  return {
    User,
    Project,
    Organization
  };
};