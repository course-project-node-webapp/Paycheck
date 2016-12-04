'use strict';

const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../'));

module.exports = {
    development: {
        rootPath,
        sessionSecret: '[insert session secret here]',
        connectionString: 'mongodb://localhost:27017/paycheck-db',
        facebookAppId:  'asdf',
        facebookAppSecret:  'asdf',
        facebookCallbackUrl: 'localhost:3002/account/login/faceboo/callback',        
        port: 3002,
        errorResponseCode: 400
    },
    production: {
        rootPath,
        sessionSecret: process.env.SESSION_SECRET,
        connectionString: process.env.CONNECTION_STRING,
        facebookAppId:  process.env.FACEBOOK_APP_ID,
        facebookAppSecret:  process.env.FACEBOOK_APP_SECRET,
        facebookCallbackUrl: process.env.FACEBOOK_APP_CALLBACK,
        port: process.env.PORT
    }
};
