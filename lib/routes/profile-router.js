'use strict';

module.exports = function (app, express, userData, profileControllerLoader) {
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