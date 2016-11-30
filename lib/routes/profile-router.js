'use strict';

module.exports = function ({app, express, data, controllerLoaders}) {
    const {
        userData
    } = data;

    const {
        profileControllerLoader
    } = controllerLoaders;

    let profileController = false;
    const profileRouter = new express.Router();
    profileRouter.get('/', (req, res) => {
        if (!profileController) {
            profileController = profileControllerLoader(userData);
        }

        profileController.index(req, res);
    });

    app.use('/profile', profileRouter);
};