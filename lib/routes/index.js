'use strict';

module.exports = function (app, data) {
  const express = require('express');
  // TODO: Inject controller loader and lazy load all controllers.
  require('./home-router')(app, express);
  require('./account-router')(app, express, data.userData);
  require('./project-router')(app, express, data.userData);
  require('./register-router')(app, express, data.userData);
  require('./profile-router')(app, express, data.userData);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('Page not found.');
    res.end();
  });
};