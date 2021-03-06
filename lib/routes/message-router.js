'use strict';

module.exports = function({ app, express, userData }) {
  let messagingController = false;
  const messagingRouter = new express.Router();
  messagingRouter.get('/', (req, res) => {
    if (!messagingController) {
      messagingController = lazyLoadMessagingController(userData);
    }

    messagingController.index(req, res);
  });

  app.use('/messenger', messagingRouter);
};

function lazyLoadMessagingController(userData) {
  const messagingController = require('../controllers/message-controller')(userData);
  return messagingController;
}