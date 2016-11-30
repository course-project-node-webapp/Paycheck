/* globals Promise $ toastr */

'use strict';

(() => {
  const MIN_SKILL_NAME_LENGTH = 3;
  const MAX_SKILL_NAME_LENGTH = 20;

  const $addListItem = $('ul.skills>li.add');
  const $addSkillBtn = $('a.add-skill-btn');

  const $submitSkillBtn = $('<a class="btn btn-success submit-skill-btn">Add</a>');
  const $skillInput = $('<input class="form-control" type="text" placeholder="Enter your skill"/>');
  const $addSkillInputContainer = $('<div class="add-skill-input-container hide"/>')
    .append($skillInput)
    .append($submitSkillBtn);

  $addListItem.append($addSkillInputContainer);

  $addSkillBtn.on('click', () => {
    $addSkillBtn.addClass('hide');

    $addSkillInputContainer.removeClass('hide');
  });

  $submitSkillBtn.on('click', () => {
    return Promise.resolve()
      .then(() => {
        let skill = $skillInput.val();
        validateString(skill);

        return skill;
      })
      .then((skill) => {
        $.ajax({
            url: 'account/update/skills',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(skill)
          })
          .fail((err) => {
            toastr.error(err.message);
          });
      })
      .then(() => {
        $addSkillInputContainer.addClass('hide');
        $skillInput.val('');

        $addSkillBtn.removeClass('hide');
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  });

  function validateString(value) {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string.');
    }

    const len = value.length;
    if (!(MIN_SKILL_NAME_LENGTH <= len && len <= MAX_SKILL_NAME_LENGTH)) {
      throw new Error('Invalid value length.');
    }

    if (!/[A-z]/.test(value)) {
      throw new Error('Only latin letters are allowed.');
    }
  }
})();