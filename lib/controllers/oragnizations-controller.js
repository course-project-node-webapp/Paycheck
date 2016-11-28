'use strict';

module.exports = function (organizationsData) {
  function index(req, res) {
    const page = req.query.page || 0;
    const size = req.query.size || 5;

    organizationsData.findPage(page, size)
      .then((organizations) => {
        res.render('./organizations/index', {
          isAuthenticated: req.isAuthenticated(),
          result: {
            organizations
          }
        });
      })
      .catch((err) => {
        // TODO: log error, fs logger ? 
        res.send(err.message);
      });
  }

  return {
    index
  };
};