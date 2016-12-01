/* globals $ */

'use strict';

(() => {
  const $searchCategories = $('ul.dropdown-menu.search-categories > li');
  const $searchForm = $('form.search-form');
  const $searchInput = $('input.search-input');

  let searchCategory;
  $searchCategories.on('click', function() {
    searchCategory = $(this).text().toLowerCase();
    $searchForm.attr('action', `/${searchCategory}/search`);

    $searchInput.val('');
    $searchInput.attr('placeholder', `Search ${searchCategory}...`);
  });
})();