/* globals $ io */

'use strict';

(() => {
  const $status = $('.chat-status span'),
    $textarea = $('.chat-textarea'),
    $messages = $('.chat-messages'),
    $fullname = $('.full-name'),
    defaultStatus = $status.text(),
    setStatus = function(s) {
      $status.text(s);

      if (s !== defaultStatus) {
        let delay = setTimeout(function() {
          setStatus(defaultStatus);
          clearInterval(delay);
        }, 3000);
      }
    };

  var socket = io.connect();

  socket.on('output', function(data) {
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        let $message = $('<div/>', { 'class': 'chat-message' });
        $message.text(data[i].name + ': ' + data[i].message);

        $messages.append($message);
        $messages.insertAfter($messages);
      }
    }
  });

  socket.on('status', function(data) {
    setStatus((typeof data === 'object') ? data.message : data);
    if (data.clear === true) {
      $textarea.val('');
    }
  });

  $textarea.on('keydown', function(event) {
    let self = this,
      name = $fullname.text();

    if (event.which === 13 && event.shiftKey === false) {
      socket.emit('input', {
        name: name,
        message: self.value
      });

      $('chat-messages').scrollTop = $('chat-messages').scrollHeight;
      event.preventDefault();
    }
  });
})();