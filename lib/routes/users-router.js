'use strict';

module.exports = function (app, express, userData, userControllerLoader) {
  let usersController = false;
  const usersRouter = new express.Router();
  usersRouter
    .get('/:id', (req, res) => {
      if (!usersController) {
        usersController = userControllerLoader(userData);
      }

      usersController.getById(req, res);
    })
    .get('/', (req, res) => {
      if (!usersController) {
        usersController = userControllerLoader(userData);
      }

      usersController.getAll(req, res);
    });

  app.use('/users', usersRouter);
};