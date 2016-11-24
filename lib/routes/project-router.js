const express = require('express');

module.exports = function(app, userData) {
    const projectRouter = new express.Router();
    const projectController = require('../controllers/project-controller')(userData);

    projectRouter.get('/', projectController.index);

    app.use('/createproject', projectRouter);
};