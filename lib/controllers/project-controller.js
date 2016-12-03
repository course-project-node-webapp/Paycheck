'use strict';

module.exports = function (projectsData, logger) {
  function index(req, res) {
    res.status(200)
      .render('./project/index', {
        isAuthenticated: req.isAuthenticated(),
        result: req
      });
  }

  function createProject(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    return projectsData.createProject(req.body)
      .then(res.render('./project/success', {
        result: {
          user: req.user
        },
        name: req.body.name
      }))
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function search(req, res) {
    const isAuthenticated = req.isAuthenticated();

    projectsData.getProjectsWhichContains(req.query.search)
      .then((projects) => {
        return res
          .status(200)
          .render('./project/projects-list', {
            isAuthenticated,
            result: {
              data: projects,
              user: req.user
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function listAllProjects(req, res) {
    return projectsData.getAllProjects()
      .then((data) => {
        res.status(200)
          .render('./project/projects-list', {
            result: {
              user: req.user,
              data
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function listMyProjects(req, res) {
    return projectsData.getAllProjects()
      .then((data) => {
        res.status(200)
          .render('./project/my-projects-list', {
            result: {
              user: req.user,
              data
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function getProjectBySkillWebDeveloping(req, res) {
    return projectsData.getProjectBySkill('webdeveloping')
      .then((data) => {
        res.status(200)
          .render('./project/webdeveloper', {
            result: {
              user: req.user
            },
            data
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function getProjectBySkillMobileDeveloping(req, res) {
    return projectsData.getProjectBySkill('mobiledeveloping')
      .then((data) => {
        res.status(200)
          .render('./project/mobiledeveloper', {
            result: {
              user: req.user
            },
            data
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function addAplyerToProject(req, res) {
    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    const projectName = req.params.projectname;
    const applyer = req.body.applyer;

    return projectsData.updateProjectAplyersByName(projectName, applyer)
      .then(res.status(200).redirect('/projects'))
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function addAplyerToProjectEmployees(req, res) {
    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    const projectName = req.params.projectname;
    const employee = {
      employeeName: req.body.employee
    };

    return projectsData.updateProjectEmployeesByName(projectName, employee)
      .then(res.status(200).redirect('/projects/my-projects'))
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  return {
    index,
    search,
    createProject,
    listAllProjects,
    getProjectBySkillWebDeveloping,
    getProjectBySkillMobileDeveloping,
    addAplyerToProject,
    listMyProjects,
    addAplyerToProjectEmployees
  };
};