'use strict';

module.exports = function (models) {
  const userData = require('./user-data')(models.User);
  const organizationsData = require('./organizations-data')(models.Organization);
  const projectsData = require('./project-data')(models.Project);
  const messageData = require('./message-data')(models.Message);

  return {
    userData,
    organizationsData,
    projectsData,
    messageData
  };
};