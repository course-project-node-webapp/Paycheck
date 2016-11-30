'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
  const {
    projectsData
  } = data;

  const {
    projectControllerLoader
  } = controllerLoaders;

  let projectController = false;
  const projectRouter = new express.Router();
  projectRouter
    .get('/', (req, res) => {
      if (!projectController) {
        projectController = projectControllerLoader(projectsData);
      }

      projectController.listAllProjects(req, res);
    })
    .get('/create', (req, res) => {
      if (!projectController) {
        projectController = projectControllerLoader(projectsData);
      }

      projectController.index(req, res);
    })
    .post('/create', (req, res) => {
      if (!projectController) {
        projectController = projectControllerLoader(projectsData);
      }

      projectController.createProject(req, res);
    })
    .get('/webdeveloper', (req, res) => {
      if (!projectController) {
        projectController = projectControllerLoader(projectsData);
      }

      projectController.getProjectBySkillWebDeveloping(req, res);
    })
    .get('/mobiledeveloper', (req, res) => {
      if (!projectController) {
        projectController = projectControllerLoader(projectsData);
      }

      projectController.getProjectBySkillMobileDeveloping(req, res);
    });

  app.use('/projects', projectRouter);
};