'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const port = Number(process.env.PORT || config.port);
const logger = require('./config/logger');

logger.info('Configuring express...');
const app = require('./config/express')(config);
logger.info('Expressed configured...');

const models = require('./lib/models')();
const data = require('./data')(models);

require('./config/database')(config);
require('./config/passport')(data.userData);
require('./lib/routes')(app, data);

const server = require('./config/sockets')(app, data);
server.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});