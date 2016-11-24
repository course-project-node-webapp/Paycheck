'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  managerName: String,
  emploeyees: [{
    employeeName: String,
    hoursWorked: Number,
    tasksCompleted: [String]
  }],
  tasks: [String]
});

let Project;
projectSchema.statics.getProject = (project) => {
  return new Project({
    name: project.name,
    description: project.description,
    managerName: project.managerName,
    emploeyees: project.emploeyees,
    tasks: project.tasks
  });
};
mongoose.model('Project', projectSchema);
Project = mongoose.model('Project');
module.exports = mongoose.model('Project');