'use strict';

module.exports = function() {
  function index(req, res) {
    let isAuthenticated = req.isAuthenticated();

    if (!isAuthenticated) {
      return res
        .status(401)
        .redirect('/account/login');
    }

    return res
      .status(200)
      .render('./profile/index', {
        isAuthenticated,
        result: {
          user: req.user
        }
      });
  }

  return {
    index
  };
};