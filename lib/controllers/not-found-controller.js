'use strict';

module.exports = function () {
  function index(req, res) {
    res.status(404);
    res.render('./notfound', {
      isAuthenticated: req.isAuthenticated(),
      result: {
        user: req.user
      }
    });

    res.end();
  }

  return {
    index
  };
};