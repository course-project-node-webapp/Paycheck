'use strict';

module.exports = function (organizationsData) {
  function index(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    return organizationsData.findById(organizationId)
      .then((organization) => {
        res.render('./organizations/projects/index', {
          result: {
            user: req.user,
            organization
          }
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  return {
    index
  };
};