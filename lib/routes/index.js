'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (app, data, controllerLoaders) {
  const {
    notFoundControllerLoader
  } = controllerLoaders;

  const express = require('express');

  fs.readdirSync('./lib/routes')
    .filter(fileName => fileName.includes('-router'))
    .forEach(fileName => {
      require(path.join(__dirname, fileName))({
        app,
        express,
        data,
        controllerLoaders
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