'use strict';

module.exports = function (projectsData) {
  function index(req, res) {
    res.render('./project/index', {
      isAuthenticated: req.isAuthenticated()
    });
  }

  function createProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    return projectsData.createProject(req.body)
      .then(res.render('./project/success', req.body));
  }

  function listAllProjects(req, res) {
    return projectsData.getAllProjects()
      .then((data) => {
        res.render('./project/projects-list', {
          data
        });
      });
  }

  return {
    index,
    createProject,
    listAllProjects
  };
};