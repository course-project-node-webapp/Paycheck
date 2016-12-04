/* globals Promise */

'use strict';
const validator = require('validator');
module.exports = function ({ models }) {
  const {
    Organization
  } = models;

  function createOrganization(organization) {
    return new Promise((resolve, reject) => {
      if (!organization.name || !validator.isAlphanumeric(organization.name)) {
        throw new Error('Invalid organization name.');
      }

      if (!validator.isLength(organization.name, { min: 1, max: 50 })) {
        throw new Error('Invalid organization name length, min: 1, max: 50');
      }

      if (organization.image && !validator.isURL(organization.image)) {
        throw new Error('Invalid image url.');
      }

      if (!organization.owners || !Array.isArray(organization.owners)) {
        throw new Error('Invalid owners list.');
      }

      organization.name = validator.escape(organization.name);

      organization.projects.forEach(project => {
        project.tasks.forEach(task => {
          if(!validator.isAscii(task.name)){
            throw new Error(`Invalid task name: ${task.name}`);
          }

          if(!validator.isAscii(task.description)){
            throw new Error(`Invalid task description: ${task.description}`);
          }
        });
      });

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
    if (!id || !validator.isAscii(id)) {
      throw new Error('Invlalid organization id.');
    }

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
    if (!name || !validator.isAscii(name)) {
      throw new Error('Invalid organization name.');
    }

    if (!validator.isLength(name, { min: 1, max: 50 })) {
      throw new Error('Invalid organization name length, min: 1, max: 50');
    }

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

  function getOrganizationsWhichContains(stringToMatch) {
    if (!stringToMatch || !validator.isAscii(stringToMatch)) {
      throw new Error('Invalid organization name.');
    }

    let regex = new RegExp(stringToMatch, 'i');
    return new Promise((resolve, reject) => {
      Organization.find({
        name: regex
      }, (err, organizations) => {
        if (err) {
          return reject(err);
        }

        return resolve(organizations);
      });
    });
  }

  function findPage(page, size) {
    if (!validator.isInt(page + '', { min: 0, max: 100 })) {
      throw new Error('Invalid page number, allowed values 0 - 100.');
    }

    if (!validator.isInt(size + '', { min: 1, max: 50 })) {
      throw new Error('Invalid page size, allowed values 1 - 50.');
    }

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
    if (!organization.name || !validator.isAlphanumeric(organization.name)) {
      throw new Error('Invalid organization name.');
    }

    if (!validator.isLength(organization.name, { min: 1, max: 50 })) {
      throw new Error('Invalid organization name length, min: 1, max: 50');
    }

    if (organization.image && !validator.isURL(organization.image)) {
      throw new Error('Invalid image url.');
    }

    if (!organization.owners || !Array.isArray(organization.owners)) {
      throw new Error('Invalid owners list.');
    }

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
    getOrganizationsWhichContains,
    findPage,
    updateOrganization
  };
};