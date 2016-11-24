'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = function (userData) {
  const localStrategy = new LocalStrategy({
    username: 'username',
    password: 'password'
  }, (username, password, done) => {
    userData
      .getUserByUsername(username)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, false);
      });
  });

  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user._id);
    }

    return done(null, null);
  });

  passport.deserializeUser((id, done) => {
    userData
      .getUserById(id)
      .then(user => {
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        done(err, false);
      });
  });

  passport.use(localStrategy);
};