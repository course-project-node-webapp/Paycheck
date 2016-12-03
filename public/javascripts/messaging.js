/* globals $ io */

'use strict';

(() => {
  const $status = $('.chat-status span'),
    $textarea = $('.chat-textarea'),
    $messages = $('ul.messages'),
    $fullname = $('.full-name'),
    $onlineUsers = $('.online-users span'),
    defaultStatus = $status.text(),
    setStatus = function (s) {
      $status.text(s);

      if (s !== defaultStatus) {
        let delay = setTimeout(function () {
          setStatus(defaultStatus);
          clearInterval(delay);
        }, 3000);
      }
    };

  var socket = io.connect();

  socket.emit('new-user', $fullname.text());

  socket.on('output', function (data) {
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        let $messageWrapper = $('<li/>', {
          'class': 'chat-message'
        });
        let $author = $(`<span class="message-author capitalize">${data[i].name}</span>`);
        let $message = $(`<span class="message">${data[i].message}</span>`);

        $messageWrapper
          .append($author)
          .append($message);
        $messages.append($messageWrapper);

        $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
      }
    }
  });

  socket.on('status', function (data) {
    setStatus((typeof data === 'object') ? data.message : data);
    if (data.clear === true) {
      $textarea.val('');
    }
  });

  socket.on('online-users', function (data) {
    let users = '';
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      users += data[i] + '<br />';
    }
    $onlineUsers.html(users);
  });

  $textarea.on('keydown', function (event) {
    let self = this,
      name = $fullname.text();

    if (event.which === 13 && event.shiftKey === false) {
      socket.emit('input', {
        name: name,
        message: self.value
      });

      $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
      event.preventDefault();
    }
  });
})();