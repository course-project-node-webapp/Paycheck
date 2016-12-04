/* globals Promise */

'use strict';

module.exports = function ({models, validator}) {
  const {
    ContactMessage
  } = models;

  function createContactMessage(contactMessage) {
    return new Promise((resolve, reject) => {
      contactMessage.author = contactMessage.author || '';
      if (contactMessage.author.length > 0 && !validator.isAlphanumeric(contactMessage.author)) {
        throw new Error('Author name contains disallowed symbols');
      }

      if (!contactMessage.content || contactMessage.content.length < 200) {
        throw new Error('Message is mandatory and minimum 200 symbols.');
      }

      const newContactMessage = ContactMessage.getContactMessage(contactMessage);
      newContactMessage.save((err) => {
        if (err) {
          return reject(err);
        }

        return resolve(newContactMessage);
      });
    });
  }

  function findAll() {
    return new Promise((resolve, reject) => {
      ContactMessage.find((err, messages) => {
        if (err) {
          return reject(err);
        }

        return resolve(messages);
      });
    });
  }

  return {
    createContactMessage,
    findAll
  };
};