'use strict';

const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  owners: [{
    name: String,
    _id: String
  }],
  managers: [{
    name: String,
    _id: String
  }],
  employees: [{
    name: String,
    _id: String
  }],
  projects: [{
    name: String,
    _id: String
  }]
});

let Organization;
organizationSchema.static('getOrganization', (organization) => {
  return new Organization({
    name: organization.name,
    owners: organization.owners,
    managers: organization.managers,
    employees: organization.employees,
    projects: organization.projects
  });
});

mongoose.model('Organization', organizationSchema);
Organization = mongoose.model('Organization');

module.exports = Organization;