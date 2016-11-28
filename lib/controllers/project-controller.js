'use strict';

module.exports = function (userData) {
  function index(req, res) {
    res.render('./project/index', userData);
  }

  function createProject(req, res) {
    let projectModel = require('../models/project-model');
    let parsedProject = projectModel(req.body);
    let projectData = require('../../data/project-data')(parsedProject);

    return projectData.createProject()
      .then(res.render('./project/success', req.body));
  }

  function listAllProjects(req, res) {
    let projectModel = require('../models/project-model');
    let projectData = require('../../data/project-data')(projectModel);

    return projectData.getAllProjects()
      .then((data) => {
        res.render('./project/projects-list',{data});
      });
  }
  return {
    index,
    createProject,
    listAllProjects
  };
};