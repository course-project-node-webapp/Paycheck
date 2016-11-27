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
  image: String,
  salt: String,
  hashedPassword: String
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
    image: user.image,
    salt: generatedSalt,
    hashedPassword: encryptor.generateHashedPassword(generatedSalt, user.password)
  });
};
mongoose.model('User', userSchema);
User = mongoose.model('User');
module.exports = mongoose.model('User');