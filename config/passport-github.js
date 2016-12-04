'use strict';

const passport = require('passport');
const GithubStrategy = require('passport-github2');

module.exports = function (config, userData, env) {
  if (env !== 'development') {
    const facebookStrategy = new GithubStrategy({
      clientID: config.githubAppId,
      clientSecret: config.githubAppSecret,
      callbackURL: config.githubCallbackUrl
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
            next(err, false);
          });
      });

    passport.use(facebookStrategy);
  }
};