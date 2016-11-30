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