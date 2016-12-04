/* globals $ Promise validator toastr window */

'use strict';

(() => {
  const root = $('#create-organization');
  const tbOrganizationName = root.find('#tb-organization-name');
  const tbOrganizationImage = root.find('#tb-organization-image');
  const btnSubmit = root.find('#btn-submit');

  btnSubmit.on('click', () => {
    const organization = {
      name: tbOrganizationName.val(),
      image: tbOrganizationImage.val()
    };

    return new Promise((resolve, reject) => {
      if (!validator.isAlphanumeric(organization.name)) {
        throw new Error('Invalid organization name.');
      }

      if (organization.image && !validator.isURL(organization.image)) {
        throw new Error('Invalid image url.');
      }

      $.ajax({
        url: '/organizations/create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(organization)
      })
        .done((res) => {
          resolve(res);
        })
        .fail((err) => {
          reject(err);
        });
    })
      .then((res) => {
        toastr.success(res.message);
        setTimeout(() => {
          window.location = res.redirectUrl;
        }, 750);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  });
})();