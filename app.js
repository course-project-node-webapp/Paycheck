'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = require('./config/express')();
const models = require('./lib/models')();
const data = require('./data')();

require('./config/express')(config, app);
require('./config/database')(config);
require('./config/passport')(models.User);
require('./lib/routes')(app, data);

app.listen(config.port, () => console.log(`Server running on port: ${config.port}`));