/* globals module Promise */

'use strict';

module.exports = function (Project) {
  return {
    getAllProjects() {
      return new Promise((resolve, reject) => {
        Project.find((err, projects) => {
          if (err) {
            return reject(err);
          }

          return resolve(projects);
        });
      });
    },
    getProjectByName(projectName) {
      return new Promise((resolve, reject) => {
        Project.findOne({
          name: projectName
        }, (err, project) => {
          if (err) {
            return reject(err);
          }

          return resolve(project);
        });
      });
    },
    getProjectById(id) {
      return new Promise((resolve, reject) => {
        Project.findOne({
          _id: id
        }, (err, project) => {
          if (err) {
            return reject(err);
          }

          return resolve(project);
        });
      });
    },
    createProject(project) {
      const newProject = Project.getProject(project);

      return new Promise((resolve, reject) => {
        newProject.save(err => {
          if (err) {
            return reject(err);
          }

          return resolve(newProject);
        });
      });
    },
    getProjectBySkill(skill) {
      return new Promise((resolve, reject) => {
        Project.find({
          devSkills: skill
        }, (err, project) => {
          if (err) {
            return reject(err);
          }

          return resolve(project);
        });
      });
    },
    updateProject(project) {
      return new Promise((resolve, reject) => {
        project.save((err, updated) => {
          if (err) {
            return reject(err);
          }

          return resolve(updated);
        });
      });
    }
  };
};