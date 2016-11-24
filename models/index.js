'use strict';

const User = require('./user');
const Project = require('./project')

module.exports = {
    getUser(user) {
        return User.getUser(user);
    },
    getProject(project){
        return Project.getProject(project);
    }
};