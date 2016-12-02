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

  function create(socket) {
    const messageData = {
      username: socket.name,
      message: socket.message
    };
    // console.log(messageData);
    return data.createMessage(messageData);
  }

  function getLast100Messages() {
    return data.getLast100Messages();
  }
  return {
    index,
    create,
    getLast100Messages
  };
};