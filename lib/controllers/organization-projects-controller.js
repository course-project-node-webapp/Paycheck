'use strict';

module.exports = function (organizationsData) {
  function index(req, res) {
    const isAuthorized = req.isAuthorized();
    if (!isAuthorized) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    return organizationsData.findById(organizationId)
      .then((organization) => {
        res.render('/organizations/projects/index', {
          isAuthorized,
          result: {
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