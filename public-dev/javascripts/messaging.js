/* globals $ io validator */

'use strict';

(() => {
  const $status = $('.chat-status span'),
    $textarea = $('.chat-textarea'),
    $messages = $('ul.messages'),
    $fullname = $('.full-name'),
    $onlineUsers = $('ul.users'),
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
        let msgDate = new Date(data[i].dateCreated);
        let msgHour = convertTime(msgDate.getHours());
        let msgMinute = convertTime(msgDate.getMinutes());
        let msgSecond = convertTime(msgDate.getSeconds());
        msgDate = msgHour + ':' + msgMinute + ':' + msgSecond;
        let $dateCreated = $(`<span class="message-time">[${msgDate}]</span>`);
        let $author = $(`<span class="message-author capitalize">${data[i].name}</span>`);
        let $message = $(`<span class="message">${validator.blacklist(data[i].message, '<>')}</span>`);

        $messageWrapper
          .append($dateCreated)
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
    let $user;
    let $usersWrapper = $('<li/>', {
      'class': 'online-users'
    });
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      $user = $(`<a href='/users/'>${data[i]}</a>`);
      $usersWrapper.append($user);
    }

    $onlineUsers.append($usersWrapper);
  });

  $textarea.on('keydown', function (event) {
    let self = this,
      name = $fullname.text();

    if (event.which === 13 && event.shiftKey === false) {
      socket.emit('input', {
        name: name,
        message: validator.blacklist(self.value, '<>'),
        dateCreated: Date.now()
      });

      $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
      event.preventDefault();
    }
  });

  function convertTime(time) {
    if (time < 10) {
      time = '0' + time;
    }

    return time;
  }
})();