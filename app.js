'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const port = Number(process.env.PORT || config.port);
const logger = require('./config/logger');

logger.info('Configuring express...');
const app = require('./config/express')(config);
logger.info('Express configured...');

const controllerLoaders = require('./lib/controllers')();
const models = require('./lib/models')();
const data = require('./data')(models);

require('./config/database')(config);
require('./config/passport')(data.userData);
require('./config/passport-facebook')(config, data.userData, env);
require('./lib/routes')(app, data, controllerLoaders);

const server = require('./config/sockets')(app, data, controllerLoaders);
server.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});