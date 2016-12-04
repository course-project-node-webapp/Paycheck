/* globals $ document window */

'use strict';

(() => {
  $(document).ready(function() {

    $(window).scroll(() => {
      if ($(this).scrollTop() >= 300) {
        $('#return-to-top').fadeIn(200);
      } else {
        $('#return-to-top').fadeOut(200);
      }
    });

    $('#return-to-top').click(() => {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
    });
  });
})();