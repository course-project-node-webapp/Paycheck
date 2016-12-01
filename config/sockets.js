/* globals */

'use strict';

module.exports = function (app, data) {
  const server = require('http').Server(app);
  const io = require('socket.io').listen(server);
  const db = require('./database');

  io.on('connection', function (socket) {

    var col = db.collection('messages');
    // var sendStatus = function (status) {
    //   socket.emit('status', status);
    // };

    // col.find().limit(100).sort({
    //   _id: 1
    // }).toArray(function (err, res) {
    //   socket.emit('output', res);
    // });

    // socket.on('input', function (data) {
    //   let name = data.name;
    //   let message = data.message;
    //   let whitespacePattern = /^\s*$/;

    //   if (whitespacePattern.test(message)) {
    //     sendStatus('Message is required!');
    //   } else {
    //     col.insert({
    //         name: name,
    //         message: message
    //       },
    //       function () {
    //         io.emit('output', [data]);

    //         sendStatus({
    //           message: 'Message sent',
    //           clear: true
    //         });
    //       });
    //   }
    // });
  });

  return server;
};