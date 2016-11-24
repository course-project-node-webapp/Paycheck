'use strict';

module.exports = function (models) {
  const userData = require('./user-data')(models.User);

  return {
    userData
  };
};