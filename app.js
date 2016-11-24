'use strict';

const express = require('express');
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('./config/express')(config, app);
require('./config/database')(config);
require('./config/passport')();
require('./lib/routes')(app);

app.listen(config.port, () => console.log(`Server running on port: ${config.port}`));