'use strict';

const ProgressBar = require('progressbar.js');

module.exports = {
  circleProgressBar: (selector, options) => {
    return new ProgressBar.Circle(selector, options);
  },
  lineProgressBar: (selector, options) => {
    return new ProgressBar.Line(selector, options);
  },
  semiCircleProgressBar: (selector, options) => {
    return new ProgressBar.SemiCircle(selector, options);
  }
};