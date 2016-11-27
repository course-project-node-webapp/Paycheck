/* globals $ document window */

'use strict';

$(document).ready(function() {
  scaleVideoContainer();
  initBannerVideoSize('.video-container .poster img');
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function() {
    scaleVideoContainer();
    scaleBannerVideoSize('.video-container .poster img');
    scaleBannerVideoSize('.video-container video');
  });
});

function scaleVideoContainer() {
  let height = $(window).height();
  let unitHeight = parseInt(height) + 'px';
  $('.homepage-hero-module').css('height', unitHeight);
}

function initBannerVideoSize(element) {
  $(element).each(function() {
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });

  scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element) {
  let windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    videoWidth,
    videoHeight;

  $(element).each(function() {
    let videoAspectRatio = $(this).data('height') / $(this).data('width');
    $(this).width(windowWidth);

    if (windowWidth < 1550) {
      videoHeight = windowHeight;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });

      $(this).width(videoWidth).height(videoHeight);
    }

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
  });
}