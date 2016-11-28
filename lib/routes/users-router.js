'use strict';

module.exports = function(app, express, userData) {
  let usersController = false;
  const usersRouter = new express.Router();
  usersRouter
    .get('/:id', (req, res) => {
      if (!usersController) {
        usersController = lazyLoadRegisterController(userData);
      }

      usersController.getById(req, res);
    })
    .get('/', (req, res) => {
      if (!usersController) {
        usersController = lazyLoadRegisterController(userData);
      }

      usersController.getAll(req, res);
    });

  app.use('/users', usersRouter);
};

function lazyLoadRegisterController(userData) {
  const usersController = require('../controllers/users-controller')(userData);
  return usersController;
}