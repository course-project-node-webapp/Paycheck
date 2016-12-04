'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

module.exports = function (config, userData) {
  const facebookStrategy = new FacebookStrategy({
    clientID: '1053834598059041',
    clientSecret: '178da2d29f93b17fe3fa332f3992cbfc',
    callbackURL: "http://localhost:3002/account/login/facebook/callback"
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