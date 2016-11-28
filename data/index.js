'use strict';

module.exports = function (models) {
  const userData = require('./user-data')(models.User);
  const organizationsData = require('./organizations-data')(models.Organization);

  return {
    userData,
    organizationsData
  };
};