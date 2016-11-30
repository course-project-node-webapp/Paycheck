'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (app, data, controllerLoaders) {
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

  app.all('*', (req, res) => {
    res.status(404);
    res.render('./notfound', {
      isAuthenticated: req.isAuthenticated(),
      result: {
        user: req.user
      }
    });
    res.end();
  });
};