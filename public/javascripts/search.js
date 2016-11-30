/* globals $ */

'use strict';

(() => {
  const $searchCategories = $('ul.dropdown-menu.search-categories > li');
  const $searchForm = $('form.search-form');

  let searchCategory;
  $searchCategories.on('click', function() {
    searchCategory = $(this).text().toLowerCase();
    $searchForm.attr('action', `/${searchCategory}/search`);
  });
})();