/* globals module Promise */

'use strict';

module.exports = function (Message) {
  return {
    createMessage(message) {
      let messageModel = Message.getMessage(message);

      return new Promise((resolve, reject) => {
        messageModel.save(err => {
          if (err) {
            return reject(err);
          }

          return resolve(messageModel);
        });
      });
    },
    getLast100Messages() {
      return new Promise((resolve, reject) => {
        Message.find((err, messages) => {
          if (err) {
            return reject(err);
          }

          return resolve(messages);
        });
      });
    }
  };
};