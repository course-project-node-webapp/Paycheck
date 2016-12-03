/* globals module Promise */

'use strict';

module.exports = function({ models }) {
  const {
    User
  } = models;

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
    getUsersWhichContains(string) {
      let regex = new RegExp(string, 'i');

      return new Promise((resolve, reject) => {
        User.find({
          username: regex
        }, (err, users) => {
          if (err) {
            return reject(err);
          }

          return resolve(users);
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
      // Mongoose forced me to!
      if (!user.image) {
        delete user.image;
      }

      let userModel = User.getUser(user);

      return new Promise((resolve, reject) => {
        userModel.save(err => {
          if (err) {
            return reject(err);
          }

          return resolve(userModel);
        });
      });
    },
    updateUser(user) {
      return new Promise((resolve, reject) => {
        user.save((err, updated) => {
          if (err) {
            return reject(err);
          }

          return resolve(updated);
        });
      });
    }
  };
};