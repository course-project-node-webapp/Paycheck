/* globals $ CryptoJS toastr window */

(() => {
  const content = $('#login-form');
  const tbUsername = content.find('#username-tb');
  const tbPassword = content.find('#password-tb');
  const btnSubmit = content.find('#btn-submit');

  btnSubmit.on('click', (ev) => {
    const password = tbPassword.val();
    const user = {
      username: tbUsername.val(),
      password: CryptoJS.SHA256(password).toString()
    };

    $.ajax({
        url: '/login',
        method: 'POST',
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
  });
})();