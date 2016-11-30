'use strict';

module.exports = function (projectsData) {
  function index(req, res) {
    res.render('./project/index', {
      isAuthenticated: req.isAuthenticated(),
      result: req
    });
  }

  function createProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    return projectsData.createProject(req.body)
      .then(res.render('./project/success', {
        result: {
          user: req.user
        },
        name: req.body.name
      }));
  }

  function listAllProjects(req, res) {
    return projectsData.getAllProjects()
      .then((data) => {
        res.render('./project/projects-list', {
          result: {
            user: req.user
          },
          data
        });
      });
  }

  function getProjectBySkillWebDeveloping(req, res) {
    return projectsData.getProjectBySkill('webdeveloping')
      .then((data) => {
        res.render('./project/webdeveloper', {
          result: {
            user: req.user
          },
          data
        });
      });
  }

  function getProjectBySkillMobileDeveloping(req, res) {
    return projectsData.getProjectBySkill('mobiledeveloping')
      .then((data) => {
        res.render('./project/mobiledeveloper', {
          result: {
            user: req.user
          },
          data
        });
      });
  }

  return {
    index,
    createProject,
    listAllProjects,
    getProjectBySkillWebDeveloping,
    getProjectBySkillMobileDeveloping
  };
};