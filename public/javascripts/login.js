/* globals $ CryptoJS toastr window */

(() => {
  const content = $('#login-form');
  const tbUsername = content.find('#username-tb');
  const tbPassword = content.find('#password-tb');
  const btnSubmit = content.find('#btn-submit');
  const btnRegister = content.find('#btn-register');

  // TODO: VALIDATION

  btnRegister.on('click', (ev) => {
    const user = getUserFromInput();
    createRequest('PUT', user);
  });

  btnSubmit.on('click', (ev) => {
    const user = getUserFromInput();
    createRequest('POST', user);
  });

  function getUserFromInput() {
    const password = tbPassword.val();
    const user = {
      username: tbUsername.val(),
      password: CryptoJS.SHA256(password).toString()
    };

    return user;
  }

  function createRequest(method, user) {
    $.ajax({
        url: '/login',
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(user)
      })
      .done((res) => {
        toastr.success(res.message);
        setTimeout(() => {
          window.location = res.redirectUrl;
        }, 1000);
      })
      .fail(() => {
        toastr.error('Incorrect username or password.');
      });
  }
})();