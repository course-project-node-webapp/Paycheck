/* globals Promise $ toastr window */

'use strict';

(() => {
  toastr.options.preventDuplicates = true;

  const MIN_SKILL_NAME_LENGTH = 3;
  const MAX_SKILL_NAME_LENGTH = 20;

  const $addListItem = $('ul.skills>li.add');
  const $addSkillBtn = $('a.add-skill-btn');

  const $editMode = $('.edit-mode');
  const $editProfileBtn = $('a.edit-profile-btn');
  const $saveChangesBtn = $('a.save-changes-btn');
  const $deleteSkillBtn = $('a.btn-delete');

  const $saveIcon = $('<i class="material-icons">save</i>')
    .css({
      'background-color': '#4CAF50'
    });

  const $editSummayBtn = $('a.btn-summary-edit');
  const editSummaryBtnHtml = $editSummayBtn[0].outerHTML;
  const $saveSummaryBtn = $('<a class="btn-save-circle btn-edit btn-save-summary">')
    .append($saveIcon);

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
        return new Promise((resolve, reject) => {
          $.ajax({
              url: '/account/update/skills/add',
              method: 'PUT',
              contentType: 'application/json',
              data: JSON.stringify({ skill })
            })
            .done(() => {
              window.location.reload(false);
              resolve();
            })
            .fail((err) => {
              reject(err);
            });
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
  });

  $editSummayBtn.on('click', function() {
    const $this = $(this);
    let $spanDescription = $this.next('span');
    let currentSummary = $spanDescription.text();

    let $summaryInput = $(`<textarea class="summary-input form-control animated fadeIn">${currentSummary}</textarea>`)
      .css({
        width: '100%',
        height: '10em',
        'margin-top': '2vh'
      });
    $spanDescription.replaceWith($summaryInput);

    $this.replaceWith($saveSummaryBtn);
  });

  $saveSummaryBtn.on('click', function() {
    const $this = $(this);
    const $textArea = $('textarea.summary-input');

    return Promise.resolve()
      .then(() => {

      });

    let inputValue = $textArea.val();
    $textArea.replaceWith(`<span>${inputValue}</span>`);

    $this.replaceWith(editSummaryBtnHtml);
  });

  $deleteSkillBtn.on('click', function() {
    const $this = $(this);
    let skill = $this.nextAll('span.skill-name').text();

    return Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          $.ajax({
              url: '/account/update/skills/remove',
              method: 'PUT',
              contentType: 'application/json',
              data: JSON.stringify({ skill })
            })
            .done(resolve)
            .fail((err) => {
              reject(err);
            });
        });
      })
      .then(() => {
        $this.parent('li.skill').addClass('animated zoomOut');
        setTimeout(function() {
          $this.parent('li.skill').remove();
        }, 400);
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