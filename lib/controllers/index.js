'use strict';

const homeController = require('./home-controller');
const userController = require('./users-controller');

module.exports = {
    home: homeController,
    user: userController
};