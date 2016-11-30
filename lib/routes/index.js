'use strict';

module.exports = function (app, data, controllerLoaders) {
  const express = require('express');

  require('./home-router')(app, express, controllerLoaders);
  require('./register-router')(app, express, data.userData, controllerLoaders);
  require('./account-router')(app, express, data.userData, controllerLoaders.accountControllerLoader);
  require('./project-router')(app, express, data.projectsDat, controllerLoaders);
  require('./profile-router')(app, express, data.userData, controllerLoaders);
  require('./organizations-router')(app, express, data.organizationsData, data.userData, controllerLoaders);
  require('./users-router')(app, express, data.userData, controllerLoaders);
  require('./organization-projects-router.js')(app, express, data.organizationsData, data.projectsData, controllerLoaders);
  require('./organization-employees-router')(app, express, data.organizationsData, data.userData, controllerLoaders);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('Page not found.');
    res.end();
  });
};