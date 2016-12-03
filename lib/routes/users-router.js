'use strict';

module.exports = function ({ app, express, data, controllerLoaders, logger, parametersValidator }) {
  const {
    userData
  } = data;

  const {
    userControllerLoader
  } = controllerLoaders;

  const usersController = userControllerLoader(userData, logger);
  const usersRouter = new express.Router();
  usersRouter
    .get('/', usersController.getAll)
    .get('/search', usersController.search)
    .get('/:id', parametersValidator, usersController.getById);

  app.use('/users', usersRouter);
};