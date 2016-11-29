'use strict';

module.exports = function(app, express, projectsData) {
    let projectController = false;
    const projectRouter = new express.Router();
    projectRouter
        .get('/',(req, res)=>{
             if (!projectController) {
                projectController = lazyLoadProjectController(projectsData);
            }
            
            projectController.listAllProjects(req, res);
        })
        .get('/create', (req, res) => {
            if (!projectController) {
                projectController = lazyLoadProjectController(projectsData);
            }

            projectController.index(req, res);
        })
        .post('/create', (req, res) => {
            if (!projectController) {
                projectController = lazyLoadProjectController(projectsData);
            }

            projectController.createProject(req, res);
        });

    app.use('/projects', projectRouter);
};

function lazyLoadProjectController(projectsData) {
    const projectController = require('../controllers/project-controller')(projectsData);
    return projectController;
}