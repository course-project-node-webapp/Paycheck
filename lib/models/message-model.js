'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const messageSchema = new Schema({
  username: String,
  message: String
});

let Message;
messageSchema.statics.getMessage = (message) => {
  return new Message({
    username: message.username,
    message: message.message
  });
};

mongoose.model('Message', messageSchema);
Message = mongoose.model('Message');
module.exports = mongoose.model('Message');