'use strict';

module.exports = function(data) {
  function index(req, res) {
    let isAuthenticated = req.isAuthenticated();

    if (!isAuthenticated) {
      return res
        .status(400)
        .redirect('/account/login');
    }

    return res
      .status(200)
      .render('./messaging/index', {
        isAuthorized: true,
        isAuthenticated,
        result: {
          user: req.user,
          userData: req.user
        }
      });
  }

  function create(req, res) {
    const message = req.body;
    return data.createMessage(message);
  }

  function getLast100Messages(req, res) {
    return data.getLast100Messages();
  }
  return {
    index,
    create,
    getLast100Messages
  };
};