'use strict';

module.exports = function (app, data, controllerLoaders) {
  const express = require('express');

  require('./home-router')(app, express, controllerLoaders.homeControllerLoader);
  require('./register-router')(app, express, data.userData, controllerLoaders.registerControllerLoader);
  require('./account-update-router')(app, express, data.userData, controllerLoaders.accountUpdateControllerLoader);
  require('./account-router')(app, express, data.userData, controllerLoaders.accountControllerLoader);
  require('./project-router')(app, express, data.projectsData, controllerLoaders.projectControllerLoader);
  require('./profile-router')(app, express, data.userData, controllerLoaders.profileControllerLoader);
  require('./organizations-router')(app, express, data.organizationsData, data.userData, controllerLoaders.organizationsControllerLoader);
  require('./users-router')(app, express, data.userData, controllerLoaders.userControllerLoader);
  require('./organization-projects-router.js')(app, express, data.organizationsData, data.projectsData, controllerLoaders.organizationProjectsControllerLoader);
  require('./organization-employees-router')(app, express, data.organizationsData, data.userData, controllerLoaders.organizationEmployeesControllerLoader);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('Page not found.');
    res.end();
  });
};