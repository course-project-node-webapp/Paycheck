/* globals $ Promise toastr window validator*/

'uvarse strict';

(() => {
  var root = $('#contact-form'),
    tbAuthor = root.find('#tb-author'),
    tbContent = root.find('#tb-content'),
    btnSubmit = root.find('#btn-submit');

  btnSubmit.on('click', () => {
    const contactMessage = {
      author: tbAuthor.val(),
      content: tbContent.val()
    };

    return new Promise((resolve, reject) => {
      contactMessage.author = contactMessage.author || '';
      if (contactMessage.author.length > 0 && !validator.isAlphanumeric(contactMessage.author)) {
        throw new Error('Author name contains disallowed symbols');
      }

      if (!contactMessage.content || contactMessage.content.length < 200) {
        throw new Error('Message is mandatory and minimum 200 symbols.');
      }

      contactMessage.content = validator.escape(contactMessage.content);

      $.ajax({
        url: '/contact',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contactMessage)
      })
        .done((res) => {
          resolve(res);
        })
        .fail((err) => {
          reject(err);
        });
    })
      .then((res) => {
        toastr.success(res.message);
        setTimeout(() => {
          window.location = res.redirectUrl;
        }, 750);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  });
})();