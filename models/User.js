'use strict';

const constants = require('../config/constants');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const encryptor = require('../utilities/encryptor');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        min: constants.nameMinLength,
        max: constants.nameMaxLength
    },
    lastName: {
        type: String,
        required: true,
        min: constants.nameMinLength,
        max: constants.nameMaxLength
    },
    salt: String,
    hashedPassword: String
});

userSchema.method({
    authenticate: function (password) {
        let inputHashedPassword = encryptor.generateHashedPassword(this.salt, password);
        return inputHashedPassword === this.hashedPassword;
    }
});

let User;
userSchema.statics.getUser = (user) => {
    return new User({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    });
};
mongoose.model('User', userSchema);
User = mongoose.model('User');
module.exports = mongoose.model('User');