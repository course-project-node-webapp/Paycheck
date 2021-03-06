'use strict';

module.exports = function () {
  function index(req, res) {
    if (req.user) {
      res
        .status(200)
        .redirect('./profile');
    } else {
      res
        .status(200)
        .render('./home/index', {
          result: {
            user: req.user
          }
        });
    }
  }

  return {
    index
  };
};