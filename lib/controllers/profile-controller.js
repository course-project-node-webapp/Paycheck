'use strict';

module.exports = function (userData) {
  function index(req, res) {
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .redirect('/account/login');
    }

    return res
      .status(200)
      .render('./profile/index', {
        result: {
          user: req.user
        },
        imageSrc: req.user.image || 'http://philosophy.ucr.edu/wp-content/uploads/2014/10/no-profile-img.gif',
        isAuthenticated: true,
        isLoggedIn: true
      });
  }

  return {
    index
  };
};