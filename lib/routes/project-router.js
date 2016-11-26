/* globals Promise */
'use strict';

module.exports = function (app, express, userData) {
    let projectController = false;
    const projectRouter = new express.Router();
    projectRouter
        .get('/', (req, res) => {
            if (!projectController) {
                projectController = lazyLoadProjectController(userData);
            }

            projectController.index(req, res);
        })
        .post('/', (req, res) => {
            if (!projectController) {
                projectController = lazyLoadProjectController(userData);
            }

            projectController.createProject(req, res);
        });

    app.use('/createproject', projectRouter);
};

function lazyLoadProjectController(userData) {
    const projectController = require('../controllers/project-controller')(userData);
    return projectController;
}