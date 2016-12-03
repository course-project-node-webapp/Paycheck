'use strict';

module.exports = function ({app, express, data, controllerLoaders, logger, parametersValidator}) {
  const {
    projectsData
  } = data;

  const {
    projectControllerLoader
  } = controllerLoaders;

  const projectController = projectControllerLoader(projectsData, logger);
  const projectRouter = new express.Router();
  projectRouter
    .get('/', projectController.listAllProjects)
    .get('/myprojects', projectController.listMyProjects)
    .get('/create', projectController.index)
    .post('/create', projectController.createProject)
    .get('/search', projectController.search)
    .get('/webdeveloper', projectController.getProjectBySkillWebDeveloping)
    .get('/mobiledeveloper', projectController.getProjectBySkillMobileDeveloping)
    .post('/aplyers/:projectname', parametersValidator, projectController.addAplyerToProject)
    .post('/employees/:projectname', parametersValidator, projectController.addAplyerToProjectEmployees);

  app.use('/projects', projectRouter);
};