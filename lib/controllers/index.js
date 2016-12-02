'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function () {
  let controllersLoader = {};
  fs.readdirSync('./lib/controllers')
    .filter(fileName => fileName.includes('-controller'))
    .forEach(fileName => {
      const loader = require(path.join(__dirname, fileName));
      const loaderName = convertFileNameToLoaderName(fileName);

      controllersLoader[loaderName] = loader;
    });

  return controllersLoader;
};

function convertFileNameToLoaderName(name) {
  const nameLength = name.length;

  let isCapitalLetter = false;
  let loaderName = '';

  for (let i = 0; i < nameLength; i += 1) {
    const nextChar = name[i];

    if (nextChar === '.') {
      break;
    }

    if (nextChar === '-') {
      isCapitalLetter = true;
    } else if (isCapitalLetter) {
      isCapitalLetter = false;
      loaderName += nextChar.toUpperCase();
    } else {
      loaderName += nextChar;
    }
  }

  loaderName += 'Loader';
  return loaderName;
}
