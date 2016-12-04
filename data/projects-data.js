/* globals module Promise */

'use strict';

module.exports = function ({
  models,
  validator
}) {
  const {
    Project
  } = models;

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
    updateProjectAplyersByName(projectName, applyer) {
      return new Promise((resolve, reject) => {
        Project.findOne({
          name: projectName
        }, (err, project) => {
          if (err) {
            return reject(err);
          }
          if (!project.applyers.some(x => x === applyer)) {
            project.applyers.push(applyer);
            project.save();
          }
          return resolve(project);
        });
      });
    },
    updateProjectEmployeesByName(projectName, employee) {
      return new Promise((resolve, reject) => {
        Project.findOne({
          name: projectName
        }, (err, project) => {
          if (err) {
            return reject(err);
          }

          if (!project.employees.some(x => x.employeeName === employee.employeeName)) {
            project.employees.push(employee);
            project.applyers.remove(employee.employeeName);
            project.save();
          }

          return resolve(project);
        });
      });
    },
    getProjectsWhichContains(string) {
      let regex = new RegExp(string, 'i');

      return new Promise((resolve, reject) => {
        Project.find({
          name: regex
        }, (err, projects) => {
          if (err) {
            return reject(err);
          }

          return resolve(projects);
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
      if (!validator.isAlphanumeric(project.name)) {
        throw new Error('Project name must contains letters and digits only');
      }

      if (!validator.isAlphanumeric(project.description)) {
        throw new Error('Project description must contains letters and digits only');
      }

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