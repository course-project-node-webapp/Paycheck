'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const logger = require('./logger');

module.exports = function (config) {
  const app = express();

  logger.debug('Overriding "Express" logger');
  app.use(morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < config.errorResponseCode;
    }
  }));

  logger.debug('Setting "Pug" as view engine');
  app.set('view engine', 'pug');

  logger.debug('Setting "Views" folder');
  const viewsFolder = config.rootPath + 'lib/views';
  app.set('views', viewsFolder);

  logger.debug('Setting "Cookie Parser" as ');
  app.use(cookieParser());

  logger.debug('Setting parse urlencoded request bodies into req.body.');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  logger.debug('Setting secret settings');
  app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
  }));

  logger.debug('Setting "Passport" as login engine');
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }
    next();
  });

  logger.debug('Setting "Public" folder');
  app.use(express.static(config.rootPath + 'public'));

  return app;
};