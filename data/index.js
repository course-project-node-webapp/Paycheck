'use strict';

const fs = require('fs');
const path = require('path');
const validator = require('validator');

module.exports = function (models) {
  const data = Object.create(null, {});
  fs.readdirSync('./data')
    .filter(fileName => fileName.includes('-data'))
    .forEach(fileName => {
      const dataModule = require(path.join(__dirname, fileName))({ models, validator });
      const dataModuleName = convertFileNameToDataModuleName(fileName);

      data[dataModuleName] = dataModule;
    });

  return data;
};

function convertFileNameToDataModuleName(fileName) {
  const indexOfSeparator = fileName.indexOf('-');
  const dataModuleName = fileName.substring(0, indexOfSeparator) + 'Data';
  return dataModuleName;
}