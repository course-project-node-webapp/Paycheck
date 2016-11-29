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
        const userRole = organization.getRoleForUser(req.user);

        res.render('./organizations/projects/index', {
          result: {
            userRole,
            user: req.user,
            organization
          }
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  function createProjectForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    return res.render('./organizations/projects/create');
  }

  return {
    index,
    createProjectForm
  };
};