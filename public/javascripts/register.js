/* globals $ toastr CryptoJS window Promise document requester validator userConstants */

'use strict';

(() => {
  toastr.options.preventDuplicates = true;

  const {
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    MIN_PASS_LENGTH,
    MAX_PASS_LENGTH
  } = userConstants;

  const registerForm = $('#register-form');
  const tbUsername = registerForm.find('#tb-username');
  const tbPassword = registerForm.find('#tb-password');
  const tbFirstName = registerForm.find('#tb-first-name');
  const tbLastName = registerForm.find('#tb-last-name');
  const tbCountry = registerForm.find('#tb-country');
  const tbProfileImg = registerForm.find('#tb-profile-img');
  const btnRegister = registerForm.find('#btn-register');

  $(document).on('keydown', (ev) => {
    const ENTER_KEY_CODE = 13;

    let keyCode = ev.keyCode || ev.which;
    if (keyCode === ENTER_KEY_CODE) {
      btnRegister.trigger('click');
    }
  });

  btnRegister.on('click', () => {
    let password = tbPassword.val();

    return Promise.resolve()
      .then(() => {
        const user = {
          username: validator.escape(tbUsername.val()),
          password: CryptoJS.SHA256(password).toString(),
          firstName: validator.escape(tbFirstName.val()),
          lastName: validator.escape(tbLastName.val()),
          image: validator.escape(tbProfileImg.val()),
          country: tbCountry.find(':selected').text()
        };

        validateUsername(user.username);
        validatePassword(password);
        validateName(user.firstName);
        validateName(user.lastName);

        if (user.image && !validator.isURL(user.image)) {
          throw new Error('Invalid image URL.');
        }

        if (user.country === 'Country') {
          throw new Error('You must select a country.');
        }

        return user;
      })
      .then((user) => {
        return requester.putJSON('/account/register', user)
          .then((res) => {
            window.location = res.redirectUrl;
          })
          .catch((err) => {
            toastr.error(err.message);
          });
      })
      .catch((err) => {
        toastr.error(err.message);
      });
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

  function validateName(value) {
    if (!validator.isLength(value, {
        min: MIN_NAME_LENGTH,
        max: MAX_NAME_LENGTH
      })) {
      throw new Error(`Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} letters long.`);
    }

    if (!validator.isAlpha(value)) {
      throw new Error('Name must consist of letters only.');
    }
  }
})();