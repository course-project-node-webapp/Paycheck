/* globals $ toastr CryptoJS window Promise */
'use strict';
(() => {
  const MIN_NAME_LENGTH = 5;
  const MAX_NAME_LENGTH = 30;

  const registerForm = $('#register-form');
  const tbUsername = registerForm.find('#tb-username');
  const tbPassword = registerForm.find('#tb-password');
  const tbFirstName = registerForm.find('#tb-first-name');
  const tbLastName = registerForm.find('#tb-last-name');
  const btnRegister = registerForm.find('#btn-register');

  btnRegister.on('click', () => {
    return Promise.resolve()
      .then(() => {
        const password = tbPassword.val();
        validateString(password);
        const user = {
          username: tbUsername.val(),
          password: CryptoJS.SHA256(password).toString(),
          firstName: tbFirstName.val(),
          lastName: tbLastName.val()
        };

        validateString(user.username);
        validateString(user.firstName);
        validateString(user.lastName);

        return user;
      })
      .then((user) => {
        $.ajax({
            url: '/register',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(user)
          })
          .done((res) => {
            toastr.success(res.message);

            setTimeout(() => {
              window.location = res.redirectUrl;
            }, 1500);
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
      throw new Error('Value must be a string');
    }

    const len = value.length;
    if (!(MIN_NAME_LENGTH <= len && len <= MAX_NAME_LENGTH)) {
      throw new Error('Invalid value length');
    }

    if (!/[A-Za-z\.-_]/.test(value)) {
      throw new Error('Only latin letters dashes and dots allowed');
    }
  }
})();