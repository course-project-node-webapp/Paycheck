'use strict';

module.exports = function (app, express, userData) {
    let messagingController = false;
    const messagingRouter = new express.Router();
    messagingRouter.get('/', (req, res) => {
        if (!messagingController) {
            messagingController = lazyLoadMessagingController(userData);
        }

        messagingController.index(req, res);
    });

    app.use('/messaging', messagingRouter);
};

function lazyLoadMessagingController(userData) {
    const messagingController = require('../controllers/messaging-controller')(userData);
    return messagingController;
}