'use strict';

const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  author: String,
  content: String
});

let ContactMessage;
contactMessageSchema.static('getContactMessage', (contactMessage)=>{
  return new ContactMessage({
    author: contactMessage.author,
    content: contactMessage.content    
  });
});

mongoose.model('ContactMessage', contactMessageSchema);
ContactMessage = mongoose.model('ContactMessage');

module.exports = ContactMessage;