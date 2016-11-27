'use strict';

module.exports = function(userData) {
    function index(req, res) {
        res.render('./project/index',userData);
    }

    function createProject(req, res) {
        let projectModel = require('../models/project-model');
        let parsedProject = projectModel(req.body);
        let projectData = require('../../data/project-data')(parsedProject);

        return projectData.createProject()
            .then(res.render('./project/successAdd',req.body));
    }
    return {
        index,
        createProject
    };
};