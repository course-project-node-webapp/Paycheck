'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  managerName: String,
  devSkills: [String],
  organization: String,
  emploeyees: [{
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
    managerName: project.managerName,
    devSkills: project.devSkills,
    emploeyees: project.emploeyees,
    tasks: project.tasks
  });
};
mongoose.model('Project', projectSchema);
Project = mongoose.model('Project');
module.exports = mongoose.model('Project');