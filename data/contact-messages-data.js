/* globals Promise */

'use strict';

module.exports = function ({models}) {
  const {
    ContactMessage
  } = models;

  function createContactMessage(contactMessage) {
    const newContactMessage = ContactMessage.getContactMessage(contactMessage);

    return new Promise((resolve, reject) => {
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