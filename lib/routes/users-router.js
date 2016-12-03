'use strict';

module.exports = function ({ app, express, data, controllerLoaders }) {
  const {
    userData
  } = data;

  const {
    userControllerLoader
  } = controllerLoaders;

  const usersController = userControllerLoader(userData);
  const usersRouter = new express.Router();
  usersRouter
    .get('/', usersController.getAll)
    .get('/search', usersController.search)
    .get('/:id', usersController.getById);

  app.use('/users', usersRouter);
};