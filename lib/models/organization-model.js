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
    username: String,
    ownerId: String
  }],
  managers: [{
    username: String,
    managerId: String
  }],
  contributors: [{
    username: String,
    contributorId: String
  }],
  unassigned: [{
    username: String,
    unassignedId: String
  }],
  projects: [{
    name: {
      type: String,
      minlength: 3,
      maxlength: 33,
      unique: true
    },
    projectId: String,
    completed: Boolean,
    description: String,
    employees: [{}],
    tasks: [{}]
  }]
});

let Organization;
organizationSchema.static('getOrganization', (organization) => {
  return new Organization({
    name: organization.name,
    owners: organization.owners,
    managers: organization.managers,
    contributors: organization.contributors,
    projects: organization.projects
  });
});

organizationSchema.method('getRoleForUser', function (user) {
  const isOwner = this.owners.some(o => o.username === user.username && o.ownerId === user._id.toString());
  if (isOwner) {
    return 'owner';
  }

  const isManager = this.managers.some(m => m.username === user.username && m.managerId === user._id.toString());
  if (isManager) {
    return 'manager';
  }

  const isContributor = this.contributors.some(c => c.username === user.username && c.contributorId === user._id.toString());
  if (isContributor) {
    return 'contributor';
  }

  return null;
});

mongoose.model('Organization', organizationSchema);
Organization = mongoose.model('Organization');

module.exports = Organization;