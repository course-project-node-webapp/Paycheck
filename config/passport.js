'use strict';

const passport = require('passport');
const LocalPassport = require('passport-local');

module.exports = function (User) {
  const local = new LocalPassport({
    username: 'username',
    password: 'password'
  }, (username, password, done) => {
    User
      .findOne({
        username: username
      })
      .then(user => {
        // TODO:
      }).catch(err => done(err, false));

  });

  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user._id);
    }
  });

  passport.deserializeUser((id, done) => {
    User
      .findById(id)
      .then(user => {
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      }).catch(err => done(err, false));
  });
};