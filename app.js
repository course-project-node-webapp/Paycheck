'use strict';

const express = require('express');
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('./config/express')(config, app);
require('./config/database')(config);
require('./config/routes')(app);
require('./config/passport')();

app.listen(config.port);