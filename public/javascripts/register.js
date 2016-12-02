/* globals $ toastr CryptoJS window Promise document */

'use strict';

(() => {
  const MIN_NAME_LENGTH = 5;
  const MAX_NAME_LENGTH = 30;

  const registerForm = $('#register-form');
  const tbUsername = registerForm.find('#tb-username');
  const tbPassword = registerForm.find('#tb-password');
  const tbFirstName = registerForm.find('#tb-first-name');
  const tbLastName = registerForm.find('#tb-last-name');
  const tbCountry = registerForm.find('#tb-country');
  const btnRegister = registerForm.find('#btn-register');

  $(document).on('keydown', (ev) => {
    const ENTER_KEY_CODE = 13;

    let keyCode = ev.keyCode || ev.which;
    if (keyCode === ENTER_KEY_CODE) {
      btnRegister.trigger('click');
    }
  });

  btnRegister.on('click', () => {
    toastr.options.preventDuplicates = true;

    return Promise.resolve()
      .then(() => {
        const password = tbPassword.val();
        const user = {
          username: tbUsername.val(),
          password: CryptoJS.SHA256(password).toString(),
          firstName: tbFirstName.val(),
          lastName: tbLastName.val(),
          country: tbCountry.find(':selected').text()
        };

        validateString(user.username);
        validateString(password);
        validateString(user.firstName);
        validateString(user.lastName);

        return user;
      })
      .then((user) => {
        $.ajax({
            url: '/account/register',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(user)
          })
          .done((res) => {
            window.location = res.redirectUrl;
          })
          .fail((err) => {
            toastr.error(err.message);
          });
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  });

  function validateString(value) {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string.');
    }

    const len = value.length;
    if (!(MIN_NAME_LENGTH <= len && len <= MAX_NAME_LENGTH)) {
      throw new Error('Invalid value length.');
    }

    if (!/[A-Za-z\.-_]/.test(value)) {
      throw new Error('Only latin letters dashes and dots allowed.');
    }
  }
})();