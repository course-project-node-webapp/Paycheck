'use strict';

const mongoose = require('mongoose');
const encryptor = require('../utilities/encryptor');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    salt: String,
    hashedPassword: String
});

userSchema.method({
    authenticate: function(password) {
        let inputHashedPassword = encryptor.generateHashedPassword(this.salt, password);
        return inputHashedPassword === this.hashedPassword;
    }
});

const User = mongoose.model('User', userSchema);

new User({
    username: 'gosho'
}).save();

module.exports.User = User;