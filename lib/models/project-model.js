'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  owner: String,
  privacy: String,
  managerName: String,
  devSkills: [String],
  organization: String,
  applyers: [String],
  employees: [{
    employeeName: String,
    employeeId: String,
    role: String,
    hoursWorked: Number,
    tasksCompleted: [String]
  }],
  tasks: [String],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

let Project;
projectSchema.statics.getProject = (project) => {
  return new Project({
    name: project.name,
    description: project.description,
    owner: project.owner,
    privacy: project.privacy,
    managerName: project.managerName,
    devSkills: project.devSkills,
    applyers: project.applyers,
    emploeyees: project.emploeyees,
    tasks: project.tasks
  });
};
mongoose.model('Project', projectSchema);
Project = mongoose.model('Project');
module.exports = mongoose.model('Project');