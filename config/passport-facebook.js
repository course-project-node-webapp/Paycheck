'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

module.exports = function ({config, userData}) {
  const facebookStrategy = new FacebookStrategy({
    clientID: '1053834598059041',
    clientSecret: '1f9caf51361f55d1655e5f84a81a3a07',
    callbackURL: "http://localhost:3002/"
  },
    function (accessToken, refreshToken, profile, cb) {
      userData.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    });

  passport.use(facebookStrategy);
};