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

  let messageController = false;
  var messagesToDisplay;

  io.on('connection', function (socket) {

    var sendStatus = function (status) {
      socket.emit('status', status);
    };

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
  });

  return server;
};