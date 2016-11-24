/* globals process */

'use strict';

const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../'));

module.exports = {
    development: {
        rootPath,
        sessionSecret: '[insert session secret here]',
        connectionString: 'mongodb://localhost:27017/paycheck-db',
        port: 3001
    },
    production: {
        rootPath,
        sessionSecret: '[insert session secret here]',
        connectionString: process.env.CONNECTION_STRING,
        port: process.env.PORT
    }
};