'use strict';

module.exports = function(data) {
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

          return res.status(400);
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

          return res.status(400);
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
        });
    }
  };
};