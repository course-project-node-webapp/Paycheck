'use strict';

module.exports = function (contactMessagesData, logger) {
  function index(req, res) {
    res.status(200)
      .render('./contact/index', {
        isAuthenticated: req.isAuthenticated(),
        result: {
          user: req.user
        }
      });
  }

  function addMessage(req, res) {
    const message = req.body;
    if (!message) {
      return res.status(400).redirect('/error');
    }

    return contactMessagesData.createContactMessage(message)
      .then(() => {
        res.status(201)
          .json({
            message: 'Successfully created a message',
            redirectUrl: '/contact/'
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400)
          .json({
            message: err.message
          });
      });
  }

  function all(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(404).redirect('/account/login');
    }

    return contactMessagesData.findAll()
      .then((messages) => {
        return res.status(200)
          .render('./contact/all', {
            isAuthenticated: req.isAuthenticated(),
            result: {
              user: req.user,
              messages
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400)
          .redirect('/error');
      });
  }

  return {
    index,
    addMessage,
    all
  };
};