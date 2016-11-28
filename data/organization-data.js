/* globals Promise */

'use strict';

module.exports = function (Organization) {
  function findById(id) {
    return new Promise((resolve, reject) => {
      Organization.findOne({
        _id: id
      }, (err, organization) => {
        if (err) {
          return reject(err);
        }

        return resolve(organization);
      });
    });
  }

  function findByName(name) {
    return new Promise((resolve, reject) => {
      Organization.findOne({
        name
      }, (err, organization) => {
        if (err) {
          return reject(err);
        }

        return resolve(organization);
      });
    });
  }

  return {
    findById,
    findByName
  };
};