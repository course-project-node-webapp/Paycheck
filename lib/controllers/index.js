'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function () {
  const accountControllerLoader = require('./account-controller');
  const homeControllerLoader = require('./home-controller');
  const organizationEmployeesControllerLoader = require('./organization-employees-controller');
  const organizationProjectsControllerLoader = require('./organization-projects-controller');
  const organizationsControllerLoader = require('./organizations-controller');
  const profileControllerLoader = require('./profile-controller');
  const projectControllerLoader = require('./project-controller');
  const registerControllerLoader = require('./register-controller');
  const userControllerLoader = require('./users-controller');

  let controllersLoader;
  fs.readdirSync('./lib/controllers')
    .filter(fileName => fileName.includes('-controller'))
    .forEach(fileName => {
      const loader = require(path.join(__dirname, fileName));
      const loaderName = convertFileNameToLoaderName(fileName);

      controllersLoader[loaderName] = loader;
    });

  return {
    accountControllerLoader,
    homeControllerLoader,
    organizationEmployeesControllerLoader,
    organizationProjectsControllerLoader,
    organizationsControllerLoader,
    profileControllerLoader,
    registerControllerLoader,
    projectControllerLoader,
    userControllerLoader
  };
};

function convertFileNameToLoaderName(name) {
  const nameLength = name.length;  
  
  let isCapitalLetter = false;
  let loaderName = '' + name[0].toUpperCase();
  
  for (let i = 1; i < nameLength; i += 1) {
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

  return loaderName;
}