/* globals $ CryptoJS toastr window Promise document */

'use strict';

(() => {
  const MIN_NAME_LENGTH = 5;
  const MAX_NAME_LENGTH = 30;

  const content = $('#login-form');
  const tbUsername = content.find('#username-tb');
  const tbPassword = content.find('#password-tb');
  const btnSubmit = content.find('#btn-submit');

  $(document).on('keydown', (ev) => {
    const ENTER_KEY_CODE = 13;

    let keyCode = ev.keyCode || ev.which;
    if (keyCode === ENTER_KEY_CODE) {
      btnSubmit.trigger('click');
    }
  });

  btnSubmit.on('click', () => {
    return getUserFromInput()
      .then((user) => {
        return createRequest('POST', user);
      })
      .catch(() => {
        toastr.error('Invalid username or password.');
      });
  });

  function getUserFromInput() {
    return new Promise((resolve) => {
      const username = tbUsername.val();
      validateString(username);

      const password = tbPassword.val();
      validateString(password);

      const user = {
        username: username,
        password: CryptoJS.SHA256(password).toString()
      };

      return resolve(user);
    });
  }

  function createRequest(method, user) {
    return new Promise((resolve, reject) => {
      $.ajax({
          url: '/account/login',
          method: method,
          contentType: 'application/json',
          data: JSON.stringify(user)
        })
        .done((res) => {
          toastr.success(res.message);
          setTimeout(() => {
            window.location = res.redirectUrl;
          }, 1500);
        })
        .fail(() => {
          return reject();
        });
    });
  }

  function validateString(value) {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string.');
    }

    const len = value.length;
    if (!(MIN_NAME_LENGTH <= len && len <= MAX_NAME_LENGTH)) {
      throw new Error('Invalid value length.');
    }

    if (!/[A-Za-z\.-_]/.test(value)) {
      throw new Error('Only latin letters, dashes and dots are allowed.');
    }
  }
})();