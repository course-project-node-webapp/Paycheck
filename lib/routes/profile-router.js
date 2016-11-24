module.exports = function (app, express, userData) {
    const profileRouter = new express.Router();
    const profileController = require('../controllers/profile-controller')(userData);

    profileRouter.get('/', profileController.index);

    app.use('/profile', profileRouter);
};