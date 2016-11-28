/* globals Promise */

'use strict';

module.exports = function (Organization) {
  function createOrganization(organization) {
    return new Promise((resolve, reject) => {
      const newOrganization = Organization.getOrganization(organization);

      newOrganization.save((err) => {
        if (err) {
          return reject(err);
        }

        return resolve(newOrganization);
      });
    });
  }

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

  function findPage(page, size) {
    const promiseData = new Promise((resolve, reject) => {
      Organization.find()
        .skip(page * size)
        .limit(size)
        .exec((err, organizations) => {
          if (err) {
            return reject(err);
          }

          return resolve(organizations);
        });
    });

    const promisePageCount = new Promise((resolve, reject) => {
      Organization.count((err, count) => {
        if (err) {
          return reject(err);
        }

        const pageCount = Math.ceil(count / size);
        return resolve(pageCount);
      });
    });

    return Promise.all([
      promiseData,
      promisePageCount
    ]);
  }

  function updateOrganization(organization) {
    return new Promise((resolve, reject) => {
      organization.save((err, updated) => {
        if (err) {
          return reject(err);
        }

        return resolve(updated);
      });
    });
  }

  return {
    createOrganization,
    findById,
    findByName,
    findPage,
    updateOrganization
  };
};