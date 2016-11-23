'use strict';

require('../models');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(config) {
    mongoose.connect(config.connectionString);
    const database = mongoose.connection;

    database.once('open', err => {
        if (err) {
            console.log(err);

            // TODO: Log to actual logger
        }
    });

    database.on('error', err => {
        console.log(err);

        // TODO: Log to actual logger
    });
};