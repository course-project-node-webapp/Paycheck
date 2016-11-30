'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (app, data, controllerLoaders) {
  const express = require('express');

  fs.readdirSync('./lib/routes')
    .filter(fileName => fileName.includes('-router'))
    // .sort((a, b) => {
    //   if (b > a) {
    //     return 1;
    //   }

    //   if (a > b) {
    //     return -1;
    //   }

    //   return 0;
    // })
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
    res.send('Page not found.');
    res.end();
  });
};