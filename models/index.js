'use strict';

const User = require('./user');

module.exports = {
    getUser(user) {
        return User.getUser(user);
    }
};