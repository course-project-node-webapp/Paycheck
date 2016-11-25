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

      let projectModel = require('../models/project-model');
      let parsedProject = projectModel(req.body);

      return new Promise((resolve, reject) => {
          parsedProject.save(err => {
            if (err) {
              return reject(err);
            }

            return resolve(parsedProject);
          });
        }).then((createdProject) => {
          res
            .status(201)
            .json({
              redirectUrl: '/',
              message: `Project ${createdProject.name} has been created!`
            });
        })
        .catch((err) => {
          res
            .status(400)
            .sent(err.message);
        });
    });

  app.use('/createproject', projectRouter);
  app.use('/addproject', projectRouter);
};

function lazyLoadProjectController(userData) {
  const projectController = require('../controllers/project-controller')(userData);
  return projectController;
}