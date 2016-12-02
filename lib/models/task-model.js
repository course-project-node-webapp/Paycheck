'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 333
  },
  solutions: [{
    username: String,
    content: String
  }],
  projectName: String
});

let Task;
taskSchema.static('getTask', (task) => {
  return new Task({
    name: task.name,
    description: task.description,
    solutions: task.solutions    
  });
});

mongoose.model('Task', taskSchema);
Task = mongoose.model('Task');

module.exports = Task;