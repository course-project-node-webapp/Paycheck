/* globals Promise $ toastr window requester */

'use strict';

(() => {
  toastr.options.preventDuplicates = true;

  const MIN_SKILL_NAME_LENGTH = 3;
  const MAX_SKILL_NAME_LENGTH = 20;

  const $editProfileBtn = $('a.edit-profile-btn');
  const $saveChangesBtn = $('a.save-changes-btn');

  const $saveIcon = $('<i class="material-icons">save</i>')
    .css({
      'background-color': '#4CAF50'
    });

  const $summaryContainer = $('div.overview');
  const $editSummayBtn = $('a.btn-summary-edit');
  const editSummaryBtnHtml = $editSummayBtn[0].outerHTML.replace(/hide\b/ig, '');
  const $saveSummaryBtn = $('<a class="btn-save-circle btn-edit btn-save-summary edit-mode">')
    .append($saveIcon);

  const $addListItem = $('ul.skills>li.add');
  const $addSkillBtn = $('a.add-skill-btn');
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

        return requester.putJSON('/account/update/skills/add', { skill });
      })
      .then(() => {
        $addSkillInputContainer.addClass('hide');
        $skillInput.val('');

        $addSkillBtn.removeClass('hide');

        window.location.reload(false);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  });

  $deleteSkillBtn.on('click', function() {
    const $this = $(this);
    let skill = $this.nextAll('span.skill-name').text();

    return Promise.resolve()
      .then(() => {
        return requester.putJSON('/account/update/skills/remove', { skill });
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

  $editProfileBtn.on('click', function() {
    let $editMode = $('.edit-mode');
    $(this).addClass('hide');

    $saveChangesBtn.removeClass('hide');
    $editMode.removeClass('hide');

    editSpecialty();
  });

  $saveChangesBtn.on('click', function() {
    let $textArea = $('textarea.summary-input');
    let $btnSummarySave = $('a.btn-save-summary');

    let inputValue = $textArea.val() && $textArea.val().trim();

    $textArea.replaceWith(`<span>${inputValue}</span>`);
    $btnSummarySave.replaceWith(editSummaryBtnHtml);

    let $editMode = $('.edit-mode');
    $editMode.addClass('hide');
    $(this).addClass('hide');

    $editProfileBtn.removeClass('hide');

    saveSpecialty();
  });

  $summaryContainer.on('click', function(ev) {
    const $target = $(ev.target);

    if ($target.hasClass('btn-summary-edit') ||
      $target.parent().hasClass('btn-summary-edit')) {
      return editSummary($target);
    } else if ($target.hasClass('btn-save-summary') ||
      $target.parent().hasClass('btn-save-summary')) {
      return saveSummary($target);
    }

    return null;
  });

  function editSummary($target) {
    let $btnSummaryEdit = $target.closest('a.btn-summary-edit');
    let $spanDescription = $btnSummaryEdit.next('span');
    let currentSummary = $spanDescription.text();

    let $summaryInput = $(`<textarea class="summary-input form-control animated fadeIn">${currentSummary}</textarea>`)
      .css({
        width: '100%',
        height: '10em',
        'margin-top': '2vh',
        padding: '10px',
        resize: 'none',
        border: '1px solid #ccc'
      });

    $btnSummaryEdit.replaceWith($saveSummaryBtn);
    $spanDescription.replaceWith($summaryInput);
  }

  function saveSummary($target) {
    let $btnSummarySave = $target.closest('a.btn-save-summary');
    let $textArea = $('textarea.summary-input');

    return Promise.resolve()
      .then(() => {
        let inputValue = $textArea.val() && $textArea.val().trim();
        requester.putJSON('/account/update/summary', { summary: inputValue });

        return inputValue;
      })
      .then((inputValue) => {
        $textArea.replaceWith(`<span>${inputValue}</span>`);
        $btnSummarySave.replaceWith(editSummaryBtnHtml);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  }

  function editSpecialty() {
    let $specialty = $('.profile-header-top h3 small');
    let currentSpecialty = $specialty.text();

    let $specialtyInput = $('<input class="specialty-input form-control animated fadeIn"/>')
      .val(currentSpecialty)
      .css({
        width: '12em'
      });

    $specialty.replaceWith($specialtyInput);
  }

  function saveSpecialty() {
    let $specialtyInput = $('.profile-header-top h3 input.specialty-input');

    return Promise.resolve()
      .then(() => {
        let inputValue = $specialtyInput.val() && $specialtyInput.val().trim();
        requester.putJSON('account/update/specialty', { specialty: inputValue });

        return inputValue;
      })
      .then((inputValue) => {
        $specialtyInput.replaceWith(`<small class="specialty capitalize">${inputValue}</small>`);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  }

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