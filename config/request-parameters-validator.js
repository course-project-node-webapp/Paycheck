'use strict';

module.exports = function () {
  function validate(req, res, next) {
    const requestParametersNames = [];
    const path = req.route.path;
    path.split('/')
      .forEach(function (element) {
        if (element[0] === ':') {
          requestParametersNames.push(element.substring(1));
        }
      }, this);

    const allParametersExist = true;
    requestParametersNames.forEach(parameterName => {
      if (!req.params[parameterName]) {
        allParametersExist = false;
      }
    });

    req.allParametersExist = allParametersExist;

    next();
  }

  return validate;
};