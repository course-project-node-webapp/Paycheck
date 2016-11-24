'use strict';

const mongoose = require('mongoose');
const encryptor = require('../utilities/encryptor');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
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
userSchema = mongoose.model('User');
module.exports = mongoose.model('User');