'use strict';

module.exports = function () {
  function hasRole(role) {
    return function (req, res, next) {
      const user = req.user;
      if (user && user.role === role) {
        return next();
      }

      // TODO: Change to login screen.
      return res.redirect('/');
    };
  }

  return {
    hasRole
  };
};