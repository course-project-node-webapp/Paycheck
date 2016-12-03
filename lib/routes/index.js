'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const logger = require('../../config/logger');
const parametersValidator = require('../../config/request-parameters-validator')();

module.exports = function (app, data, controllerLoaders) {
  const {
    notFoundControllerLoader
  } = controllerLoaders;

  fs.readdirSync('./lib/routes')
    .filter(fileName => fileName.includes('-router'))
    .forEach(fileName => {
      require(path.join(__dirname, fileName))({
        app,
        express,
        data,
        controllerLoaders,
        logger,
        parametersValidator
      });
    });

  let notFoundController;
  app.all('*', (req, res) => {
    if (!notFoundController) {
      notFoundController = notFoundControllerLoader();
    }

    notFoundController.index(req, res);
  });
};