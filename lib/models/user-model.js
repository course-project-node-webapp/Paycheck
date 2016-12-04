'use strict';

const encryptor = require('../../bin/encryptor');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DEFAULT_PROFILE_IMG =
  'http://philosophy.ucr.edu/wp-content/uploads/2014/10/no-profile-img.gif';

const MIN_NAME_LENGTH = 5;
const MAX_NAME_LENGTH = 30;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    min: MIN_NAME_LENGTH,
    max: MAX_NAME_LENGTH
  },
  firstName: {
    type: String,
    required: true,
    min: MIN_NAME_LENGTH,
    max: MAX_NAME_LENGTH
  },
  lastName: {
    type: String,
    required: true,
    min: MIN_NAME_LENGTH,
    max: MAX_NAME_LENGTH
  },
  facebookId: String,
  githubId: String,
  country: {
    type: String,
    enum: [
      '',
      'Bulgaria',
      'Germany',
      'UK',
      'USA',
      'Unknown'
    ],
    default: 'Unknown'
  },
  image: {
    type: String,
    default: DEFAULT_PROFILE_IMG
  },
  summary: {
    type: String,
    default: 'No summary.'
  },
  specialty: {
    type: String,
    default: 'None'
  },
  skills: [{
    name: {
      type: String,
      min: 3,
      max: 10
    },
    ednorsements: {
      type: Number,
      default: 0
    },
    endorsedBy: [String]
  }],
  salt: String,
  hashedPassword: String,
  organization: {
    name: String,
    organizationId: String
  },
  projects: [{
    name: String,
    image: String,
    description: String,
    tasks: [{
      description: String
    }]
  }],
  role: {
    type: String,
    enum: [
      'contributor',
      'manager',
      'owner',
      'visitor',
      'unassigned'
    ]
  }
});

userSchema.method({
  authenticate: function(password) {
    let inputHashedPassword = encryptor.generateHashedPassword(this.salt, password);
    return inputHashedPassword === this.hashedPassword;
  }
});

userSchema.methods.getSuccessRate = function(user) {
  // Temporary, project schema must be updated
  let successRatePercentage = user.projects.length / this.projects.length * 100;
  return successRatePercentage || 0;
};

let User;
userSchema.statics.getUserFromFbProfile = (fbUser) => {
  const nameWords = fbUser.displayName.split(' ');
  return new User({
    username: fbUser.displayName,
    firstName: nameWords[0],
    lastName: nameWords[1],
    facebookId: fbUser.id,
    country: 'Unknown'
  });
};

userSchema.statics.getUser = (user) => {
  const generatedSalt = encryptor.generateSalt();

  return new User({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    image: user.image,
    salt: generatedSalt,
    organization: user.organization || {
      name: 'unassigned'
    },
    hashedPassword: encryptor.generateHashedPassword(generatedSalt, user.password)
  });
};

mongoose.model('User', userSchema);
User = mongoose.model('User');
module.exports = mongoose.model('User');