/* globals Promise */

module.exports = function(app, express, userData) {
    const projectRouter = new express.Router();
    const projectController = require('../controllers/project-controller')(userData);

    app.use('/createproject', projectRouter);
    app.use('/addproject', projectRouter);

    projectRouter
        .get('/', projectController.index)
        .post('/', (req, res) => {
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
};