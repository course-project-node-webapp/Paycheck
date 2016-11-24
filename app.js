'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = require('./config/express')(config);
const models = require('./lib/models')();
const data = require('./data')(models);

require('./config/database')(config);
require('./config/passport')(data.userData);
require('./lib/routes')(app, data);

app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`);
});
