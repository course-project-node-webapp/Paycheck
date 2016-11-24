'use strict';

const User = require('./user-model');
const Project = require('./project-model');

// module.exports = {
//     getUser(user) {
//         return User.getUser(user);
//     },
//     getProject(project){
//         return Project.getProject(project);
//     }
// };

module.exports = function () {
    return {
        User,
        Project
    };
};