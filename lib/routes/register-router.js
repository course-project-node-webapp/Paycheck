module.exports = function (app, express, userData) {
  const registerRouter = new express.Router();
  const regiesterController = require('../controllers/register-controller')(userData);

  registerRouter
    .get('/', regiesterController.index);

  app.use('/register', registerRouter);
};