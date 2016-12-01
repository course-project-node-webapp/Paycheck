/* globals Promise $ toastr window */

'use strict';

(() => {
  const MIN_SKILL_NAME_LENGTH = 3;
  const MAX_SKILL_NAME_LENGTH = 20;

  const $addListItem = $('ul.skills>li.add');
  const $addSkillBtn = $('a.add-skill-btn');

  const $editMode = $('.edit-mode');
  const $editProfileBtn = $('a.edit-profile-btn');
  const $saveChangesBtn = $('a.save-changes-btn');
  const $deleteSkillBtn = $('a.btn-delete');

  const $submitSkillBtn = $('<a class="btn btn-success submit-skill-btn">Add</a>');
  const $skillInput = $('<input class="form-control skill-input" type="text" placeholder="Enter your skill"/>');
  const $addSkillInputContainer = $('<div class="add-skill-input-container hide"/>')
    .append($skillInput)
    .append($submitSkillBtn);

  $addListItem.append($addSkillInputContainer);

  $addSkillBtn.on('click', () => {
    $addSkillBtn.addClass('hide');

    $addSkillInputContainer.removeClass('hide');
  });

  $submitSkillBtn.on('click', () => {
    toastr.options.preventDuplicates = true;

    return Promise.resolve()
      .then(() => {
        let skills = $('ul.skills').children('li.skill');
        if (skills.length >= 10) {
          throw new Error('You cannot have more than 10 skills.');
        }

        let skill = $skillInput.val();
        validateString(skill);

        let skillNames = skills.children('span.skill-name');
        let doesExists = [].slice.call(skillNames)
          .some(s => s.innerHTML.toLowerCase() === skill.toLowerCase());

        if (doesExists) {
          throw new Error('Skill already exists.');
        }

        return skill;
      })
      .then((skill) => {
        $.ajax({
            url: '/account/update/skills',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ skill })
          })
          .done(() => {
            window.location.reload(false);
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

  $editProfileBtn.on('click', function() {
    $(this).addClass('hide');

    $saveChangesBtn.removeClass('hide');
    $editMode.removeClass('hide');
  });

  $saveChangesBtn.on('click', function() {
    $(this).addClass('hide');
    $editMode.addClass('hide');

    $editProfileBtn.removeClass('hide');

    // return Promise.resolve()
    //   .then(() => {
    //     let skills = $('ul.skills li.skill span.skill-name')
    //       .map((_, el) => el.innerHTML);

    //     return skills;
    //   })
    //   .then((skills) => {
    //     $.ajax({
    //       url: 
    //     });
    //   })
    //   .catch((err) => {
    //     toastr.error(err.message);
    //   });
  });

  $deleteSkillBtn.on('click', function() {
    const $target = $(this);

    $target.parent('li.skill').addClass('animated zoomOut');
    setTimeout(function() {
      $target.parent('li.skill').remove();
    }, 400);
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