'use strict';

module.exports = function(userData) {
  function index(req, res) {
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .redirect('/account/login');
    }

    console.log(req.user);

    return res
      .status(200)
      .render('./profile/index', {
        result: req.user,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        isAuthenticated: true
      });
  }

  return {
    index
  };
};