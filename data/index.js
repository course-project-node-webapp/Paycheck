'use strict';

module.exports = function (models) {
  const userData = require('./user-data')(models.User);
  const organizationsData = require('./organizations-data')(models.Organization);
  const projectsData = require('./project-data')(models.Project);

  return {
    userData,
    organizationsData,
    projectsData
  };
};