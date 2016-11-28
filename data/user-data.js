/* globals module Promise */

'use strict';

module.exports = function (User) {
  return {
    getAllUsers() {
      return new Promise((resolve, reject) => {
        User.find((err, users) => {
          if (err) {
            return reject(err);
          }

          return resolve(users);
        });
      });
    },
    getAllUsersWithoutOrganization() {
      return new Promise((resolve, reject) => {
        User.find({
          organization: {
            name: 'unassigned'
          }
        }, (err, users) => {
          if (err) {
            return reject(err);
          }

          return resolve(users);
        });
      });
    },
    getUserByUsername(username) {
      return new Promise((resolve, reject) => {
        User.findOne({
          username: username
        }, (err, user) => {
          if (err) {
            return reject(err);
          }

          return resolve(user);
        });
      });
    },
    getUserById(id) {
      return new Promise((resolve, reject) => {
        User.findOne({
          _id: id
        }, (err, user) => {
          if (err) {
            return reject(err);
          }

          return resolve(user);
        });
      });
    },
    createUser(user) {
      let userModel = User.getUser(user);

      return new Promise((resolve, reject) => {
        userModel.save(err => {
          if (err) {
            return reject(err);
          }

          return resolve(userModel);
        });
      });
    }
  };
};