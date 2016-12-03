/* globals */

'use strict';

module.exports = function (app, data, controllerLoaders) {
  const server = require('http').Server(app);
  const io = require('socket.io').listen(server);

  const {
    messageControllerLoader
  } = controllerLoaders;

  const {
    messageData
  } = data;

  var onlineUsers = {};

  function updateOnlineUsers() {
    return io.sockets.emit('online-users', Object.keys(onlineUsers));
  }

  io.on('connection', function (socket) {

    var sendStatus = function (status) {
      socket.emit('status', status);
    };

    let messageController = false;
    if (!messageController) {
      messageController = messageControllerLoader(messageData);
    }

    messageController.getLast100Messages()
      .then((messages) => {
        socket.emit('output', messages);
      });

    socket.on('input', function (socketData) {
      let message = socketData.message;
      let whitespacePattern = /^\s*$/;

      if (whitespacePattern.test(message)) {
        sendStatus('Message is required!');
      } else {
        if (!messageController) {
          messageController = messageControllerLoader(messageData);
        }

        messageController.create(socketData)
          .then(() => {
            io.emit('output', [socketData]);
            sendStatus({
              message: 'Message sent',
              clear: true
            });
          });
      }
    });

    socket.on('new-user', function (username) {
      socket.name = username;
      onlineUsers[socket.name] = username;

      updateOnlineUsers();
    });

    socket.on('disconnect', function () {
      if (!socket.name) {
        return;
      }

      delete onlineUsers[socket.name];

      updateOnlineUsers();
    });
  });

  return server;
};