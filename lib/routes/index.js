module.exports = function (app, data) {
  const express = require('express');

  require('./home-router')(app, express);
  require('./login-router')(app, data.userData, express);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('Page not found.');
    res.end();
  });
};