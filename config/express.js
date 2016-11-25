'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

module.exports = function (config) {
  const app = express();

  app.use(morgan('combined', {
    skip: function (req, res) {
      return res.statusCode < config.errorResponseCode;
    }
  }));

  app.set('view engine', 'pug');
  app.set('views', config.rootPath + 'lib/views');

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }

    next();
  });
  app.use(express.static(config.rootPath + 'public'));

  return app;
};