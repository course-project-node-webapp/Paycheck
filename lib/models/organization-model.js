'use strict';

const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  image: String,
  owners: [{
    name: String,
    _id: String
  }],
  managers: [{
    name: String,
    _id: String
  }],
  contributors: [{
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

organizationSchema.method('getRoleForUser', (user) => {
  const isOwner = this.owners.some(o => o.name === user.name && o._id === user._id);
  if (isOwner) {
    return 'owner';
  }

  const isManager = this.managers.some(m => m.name === user.name && m._id === user._id);
  if (isManager) {
    return 'manager';
  }

  const isContributor = this.contributors.some(c => c.name === user.name && c._id === user._id);
  if (isContributor) {
    return 'contributor';
  }

  return null;
});

mongoose.model('Organization', organizationSchema);
Organization = mongoose.model('Organization');

module.exports = Organization;