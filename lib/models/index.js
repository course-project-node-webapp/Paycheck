'use strict';

module.exports = function () {
  const User = require('./user-model');
  const Project = require('./project-model');

  return {
    User,
    Project
  };
};