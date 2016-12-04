/* globals module Promise */

'use strict';

module.exports = function ({
  models,
  validator
}) {
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

      if (!validator.isAlphanumeric(user.username)) {
        throw new Error('Username  must contains letters and digits only');
      }

      if (!validator.isAlphanumeric(user.firstName)) {
        throw new Error('User firtsname  must contains letters and digits only');
      }

      if (!validator.isAlphanumeric(user.lastName)) {
        throw new Error('User lastname  must contains letters and digits only');
      }

      if (user.image && !validator.isURL(user.image)) {
        throw new Error('Not a valid picture URL');
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
    },
    getUserByFacebookId(facebookId) {
      return new Promise((resolve, reject) => {
        User.findOne({
          facebookId
        }, (err, user) => {
          if (err) {
            return reject(err);
          }

          return resolve(user);
        });
      });
    },
    createUserFromFacebookUser(fbUser) {
      const user = User.getUserFromFbProfile(fbUser);

      return new Promise((resolve, reject) => {
        user.save((err) => {
          if (err) {
            return reject(err);
          }

          return resolve(user);
        });
      });
    }
  };
};