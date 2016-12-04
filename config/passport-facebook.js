'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

module.exports = function (config, userData) {
  const facebookStrategy = new FacebookStrategy({
    clientID: config.facebookAppId,
    clientSecret: config.facebookAppSecret,
    callbackURL: 'https://paycheck-app.herokuapp.com/account/login/facebook/callback'
  },
    function (accessToken, refreshToken, profile, next) {
      userData.getUserByFacebookId(profile.id)
        .then((user) => {
          if (user) {
            return next(null, user);
          }

          return userData.createUserFromFacebookUser(profile);
        })
        .then((user) => {
          next(null, user);
        })
        .catch((err) => {
          console.log(err);
          next(err, false);
        });
    });

  passport.use(facebookStrategy);
};