'use strict';

module.exports = function() {
  function index(req, res) {
    let isAuthenticated = req.isAuthenticated();

    if (!isAuthenticated) {
      return res
        .status(400)
        .redirect('/account/login');
    }

    return res
      .status(200)
      .render('./profile/index', {
        isAuthorized: true,
        isAuthenticated,
        result: {
          user: req.user,
          userData: req.user
        }
      });
  }

  return {
    index
  };
};