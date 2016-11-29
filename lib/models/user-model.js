'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const encryptor = require('../../bin/encryptor');

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
  country: {
    type: String,
    enum: [
      'Bulgaria',
      'Germany',
      'United Kingdom',
      'United States of America'
    ]
  },
  image: {
    type: String,
    default: 'http://philosophy.ucr.edu/wp-content/uploads/2014/10/no-profile-img.gif'
  },
  description: {
    type: String,
    default: 'No description.'
  },
  specialization: {
    type: String,
    enum: [
      'Software Engineer',
      'Web Designer',
      'Article Writer',
      'Digital Marketeer',
      'Accountant',
      'None'
    ],
    default: 'None'
  },
  skills: [String],
  successRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  salt: String,
  hashedPassword: String,
  organization: {
    name: String,
    organizationId: String
  },
  projects: [{
    name: String,
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

let User;
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