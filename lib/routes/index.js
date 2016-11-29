'use strict';

module.exports = function (app, data) {
  const express = require('express');

  require('./home-router')(app, express);
  require('./account-router')(app, express, data.userData);
  require('./project-router')(app, express, data.projectsData);
  require('./register-router')(app, express, data.userData);
  require('./profile-router')(app, express, data.userData);
  require('./organizations-router')(app, express, data.organizationsData, data.userData);
  require('./users-router')(app, express, data.userData);
  require('./organization-projects-router.js')(app, express, data.organizationsData);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('Page not found.');
    res.end();
  });
};