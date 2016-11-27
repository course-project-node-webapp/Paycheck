'use strict';

module.exports = function(userData) {
  function index(req, res) {
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .redirect('/account/login');
    }

    return res
      .status(200)
      .render('./profile/index', {
        result: req.user,
        isAuthenticated: true
      });
  }

  return {
    index
  };
};