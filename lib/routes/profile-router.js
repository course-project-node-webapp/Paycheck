'use strict';
module.exports = function (app, express, userData) {
    let profileController = false;
    const profileRouter = new express.Router();
    profileRouter.get('/', (req, res) => {
        if (!profileController) {
            profileController = lazyLoadProfileController(userData);
        }

        profileController.index(req, res);
    });

    app.use('/profile', profileRouter);
};

function lazyLoadProfileController(userData) {
    const profileController = require('../controllers/profile-controller')(userData);
    return profileController;
}