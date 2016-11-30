'use strict';

module.exports = function({ app, express, data, controllerLoaders }) {
  const {
    userData
  } = data;

  const {
    userControllerLoader
  } = controllerLoaders;

  let usersController = false;
  const usersRouter = new express.Router();
  usersRouter
    .get('/', (req, res) => {
      if (!usersController) {
        usersController = userControllerLoader(userData);
      }

      usersController.getAll(req, res);
    })
    .get('/search', (req, res) => {
      if (!usersController) {
        usersController = userControllerLoader(userData);
      }

      usersController.search(req, res);
    })
    .get('/:id', (req, res) => {
      if (!usersController) {
        usersController = userControllerLoader(userData);
      }

      usersController.getById(req, res);
    });

  app.use('/users', usersRouter);
};