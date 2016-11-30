'use strict';

module.exports = function(app, express, userData, accountUpdateControllerLoader) {
  let accountUpdateController;
  const accountUpdateRouter = new express.Router();
  accountUpdateRouter
    .put('/skills', (req, res) => {
      if (!accountUpdateController) {
        accountUpdateController = accountUpdateControllerLoader(userData);
      }

      accountUpdateController.addSkill(req, res);
    });

    app.use('/account/update', accountUpdateRouter);
};