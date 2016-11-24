/* globals $ toastr CryptoJS window */
'use strict';
(() => {
  const registerForm = $('#register-form');
  const tbUsername = registerForm.find('#tb-username');
  const tbPassword = registerForm.find('#tb-password');
  const tbFirstName = registerForm.find('#tb-first-name');
  const tbLastName = registerForm.find('#tb-last-name');
  const btnRegister = registerForm.find('#btn-register');

  // TODO: Validation
  btnRegister.on('click', () => {
    const user = {
      username: tbUsername.val(),
      password: CryptoJS.SHA256(tbPassword.val()).toString(),
      firstName: tbFirstName.val(),
      lastName: tbLastName.val()
    };

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
  });
})();