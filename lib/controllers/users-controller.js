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
      data.getUserById(req.params.id)
        .then(user => {
          if (user) {
            return res
              .status(200)
              .render('./profile/index', {
                isAuthenticated: req.isAuthenticated(),
                result: {
                  user
                }
              });
          }

          return res.status(400);
        });
    }
  };
};