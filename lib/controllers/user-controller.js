'use strict';

module.exports = function (data, logger) {
  return {
    getAll(req, res) {
      data.getAllUsers()
        .then(users => {
          if (users) {
            return res
              .status(200)
              .render('./users/index', {
                users,
                result: {
                  user: req.user
                }
              });
          }

          return res.status(400).send();
        })
        .catch((err) => {
          logger.info(err.message);
          res.status(400).redirect('/error');
        });
    },
    getById(req, res) {
      let isAuthenticated = req.isAuthenticated();

      data.getUserById(req.params.id)
        .then(userData => {
          if (userData) {
            return res
              .status(200)
              .render('./profile/index', {
                isAuthorized: (req.user && req.user.username) === userData.username,
                isAuthenticated,
                result: {
                  user: req.user,
                  userData
                }
              });
          }

          return res.status(400).send();
        })
        .catch((err) => {
          logger.info(err.message);
          res.status(400).redirect('/error');
        });
    },
    search(req, res) {
      let isAuthenticated = req.isAuthenticated();

      data.getUsersWhichContains(req.query.search)
        .then((users) => {
          return res
            .status(200)
            .render('./users/index', {
              isAuthenticated,
              users,
              result: { user: req.user }
            });
        })
        .catch((err) => {
          logger.info(err.message);
          res.status(400).redirect('/error');
        });
    }
  };
};