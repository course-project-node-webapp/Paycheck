/* globals $ CryptoJS toastr Promise*/

(() => {
  const content = $('#login-form');
  const usernameTb = content.find('#username-tb');
  const passwordTb = content.find('#password-tb');
  const btnSubmit = content.find('#btn-submit');

  btnSubmit.on('click', (ev) => {
    const password = passwordTb.val();
    const user = {
      username: usernameTb.val(),
      password: CryptoJS.SHA256(password).toString()
    };

    $.ajax({
        url: '/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user)
      })
      .done((res) => {
        toastr.success(res);
      })
      .fail((err) => {
        toastr.error(err);
      });
  });
})();