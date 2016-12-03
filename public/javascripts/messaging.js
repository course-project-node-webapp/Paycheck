/* globals $ io */

'use strict';

(() => {
  const $status = $('.chat-status span'),
    $textarea = $('.chat-textarea'),
    $messages = $('ul.messages'),
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
        let $messageWrapper = $('<li/>', { 'class': 'chat-message' });
        let $author = $(`<span class="message-author capitalize">${data[i].name}</span>`);
        let $message = $(`<span class="message">${data[i].message}</span>`);

        $messageWrapper
          .append($author)
          .append($message);
        $messages.append($messageWrapper);
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