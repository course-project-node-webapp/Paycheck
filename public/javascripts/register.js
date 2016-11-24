/* globals $ */
'use strict';
(() => {
  const registerForm = $('#register-form');
  const tbUsername = registerForm.find('#tb-username');
  const tbPassword = registerForm.find('#tb-password');
  const tbFirstName = registerForm.find('#tb-first-name');
  const tbLastName = registerForm.find('#tb-last-name');
  const btnRegister = registerForm.find('#btn-register');

  btnRegister.on('click', (ev) => {
    const user = {
      username: tbUsername.val(),
      password: tbPassword.val(),
      firstName: tbFirstName.val(),
      lastName: tbLastName.val()
    };

    $.ajax({
      url: '/register',
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(user)
    });
  });
})();