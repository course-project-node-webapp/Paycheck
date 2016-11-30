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

function convertFileNameToModelName(name) {
  const indexOfSeparator = name.indexOf('-');
  const modelName = name[0].toUpperCase() + name.substring(1, indexOfSeparator);
  return modelName;
}