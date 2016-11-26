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
        createProject() {
            return new Promise((resolve, reject) => {
                Project.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(Project);
                });
            });
        }
    };
};