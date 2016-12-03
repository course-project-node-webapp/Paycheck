'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  message: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

let Message;
messageSchema.statics.getMessage = (message) => {
  return new Message({
    name: message.name,
    message: message.message
  });
};

mongoose.model('Message', messageSchema);
Message = mongoose.model('Message');
module.exports = mongoose.model('Message');