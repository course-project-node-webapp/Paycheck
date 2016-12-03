'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
    const {
        userData
    } = data;

    const {
        profileControllerLoader
    } = controllerLoaders;

    const profileController = profileControllerLoader(userData);
    const profileRouter = new express.Router();
    profileRouter.get('/', profileController.index);

    app.use('/profile', profileRouter);
};