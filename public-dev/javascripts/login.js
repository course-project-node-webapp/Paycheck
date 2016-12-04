/* globals $ CryptoJS toastr window Promise document requester validator userConstants */

'use strict';

(() => {
  toastr.options.preventDuplicates = true;

  const {
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    MIN_PASS_LENGTH,
    MAX_PASS_LENGTH
  } = userConstants;

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
      .catch((err) => {
        toastr.error(err.message);
      });
  });

  function getUserFromInput() {
    return new Promise((resolve) => {
      const username = validator.escape(tbUsername.val());
      const password = validator.escape(tbPassword.val());

      validateUsername(username);
      validatePassword(password);

      const user = {
        username: username,
        password: CryptoJS.SHA256(password).toString()
      };

      return resolve(user);
    });
  }

  function createRequest(method, user) {
    return requester.postJSON('/account/login', user)
      .then((res) => {
        toastr.success(res.message);
        setTimeout(() => {
          window.location = res.redirectUrl;
        }, 1500);
      })
      .catch(() => {
        toastr.error('Invalid username or password.');
      });
  }

  function validateUsername(value) {
    if (!validator.isLength(value, {
        min: MIN_NAME_LENGTH,
        max: MAX_NAME_LENGTH
      })) {
      throw new Error(`Username must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} letters long.`);
    }

    if (!validator.isAlphanumeric(value)) {
      throw new Error('Username can consist of letters and digits only.');
    }
  }

  function validatePassword(value) {
    if (!validator.isLength(value, {
        min: MIN_PASS_LENGTH,
        max: MAX_PASS_LENGTH
      })) {
      throw new Error(`Password must be between ${MIN_PASS_LENGTH} and ${MAX_PASS_LENGTH} characters long.`);
    }
  }
})();