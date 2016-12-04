/* globals $ Promise toastr userConstants document requester validator CryptoJS window */

'use strict';

(() => {
  toastr.options.preventDuplicates = true;

  const $newUsernameInput = $('input#tb-username');
  const $newProfilePicInput = $('input#tb-profile-pic');
  const $newPasswordInput = $('input#tb-new-password');
  const $confirmPasswordInput = $('input#tb-confirm-password');
  const $saveChangesBtn = $('#settings-container a.btn.save-changes-btn');

  const {
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    MIN_PASS_LENGTH,
    MAX_PASS_LENGTH
  } = userConstants;

  $(document).on('keydown', (ev) => {
    const ENTER_KEY_CODE = 13;

    let keyCode = ev.keyCode || ev.which;
    if (keyCode === ENTER_KEY_CODE) {
      $saveChangesBtn.trigger('click');
    }
  });

  $saveChangesBtn.on('click', function() {
    let user = {};
    let username = $newUsernameInput.val();
    let image = $newProfilePicInput.val();
    let password = $newPasswordInput.val();
    let passwordConfirm = $confirmPasswordInput.val();

    return Promise.resolve()
      .then(() => {
        if (!passwordConfirm) {
          throw new Error('You must confirm your password to continue.');
        }

        if (image) {
          validateImage(image);
          user.image = image;
        }

        if (username) {
          validateUsername(username);
          user.username = validator.escape(username);
        }

        if (password) {
          validatePassword(password);
          user.password = CryptoJS.SHA256(password).toString();
        }

        validatePassword(passwordConfirm);
        user.passwordConfirm = CryptoJS.SHA256(passwordConfirm).toString();

        return requester.putJSON('/account/update', user);
      })
      .then((res) => {
        toastr.success(res.message);
        setTimeout(() => {
          window.location = res.redirectUrl;
        }, 1500);
      })
      .catch((err) => {
        if (err.message) {
          toastr.error(err.message);
        } else if (err.responseText) {
          toastr.error(err.responseText);
        }
      });

    // return new Promise((resolve, reject) => {
    //     if (!passwordConfirm) {
    //       return reject({ message: 'You must confirm your password to continue.' });
    //     }

    //     if (image) {
    //       validateImage(image);
    //       user.image = image;
    //     }

    //     if (username) {
    //       validateUsername(username);
    //       user.username = validator.escape(username);
    //     }

    //     if (password) {
    //       validatePassword(password);
    //       user.password = CryptoJS.SHA256(password).toString();
    //     }

    //     validatePassword(passwordConfirm);
    //     user.passwordConfirm = CryptoJS.SHA256(passwordConfirm).toString();

    //     return resolve(requester.putJSON('/account/update', user));
    //   })
    //   .then((res) => {
    //     toastr.success(res);
    //     setTimeout(() => {
    //       window.location = res.redirectUrl;
    //     }, 1500);
    //   })
    //   .catch((err) => {
    //     if (err.message) {
    //       toastr.error(err.message);
    //     } else if (err.responseText) {
    //       toastr.error(err.responseText);
    //     }
    //   });
  });

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

  function validateImage(value) {
    if (!validator.isURL(value)) {
      throw new Error('Profile picture must be a valid URL.');
    }
  }
})();