'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (app, data, controllerLoaders) {
  const express = require('express');

  fs.readdirSync('./lib/routes')
    .filter(fileName => fileName.includes('-router'))
    .forEach(fileName => {
      require(path.join(__dirname, fileName))(app, express, data, controllerLoaders);
    });

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