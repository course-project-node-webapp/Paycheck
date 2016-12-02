'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function () {
  const models = Object.create(null, {});
  fs.readdirSync('./lib/models')
    .filter(fileName => fileName.includes('-model'))
    .forEach(fileName => {
      const model = require(path.join(__dirname, fileName));
      const modelName = convertFileNameToModelName(fileName);

      models[modelName] = model;
    });

  return models;
};

function convertFileNameToModelName(fileName) {
  const indexOfSeparator = fileName.indexOf('-');
  const modelName = fileName[0].toUpperCase() + fileName.substring(1, indexOfSeparator);
  return modelName;
}
