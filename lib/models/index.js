'use strict';

// module.exports = {
//     getUser(user) {
//         return User.getUser(user);
//     },
//     getProject(project){
//         return Project.getProject(project);
//     }
// };

module.exports = function () {
  const User = require('./user-model');
  const Project = require('./project-model');

  return {
    User,
    Project
  };
};