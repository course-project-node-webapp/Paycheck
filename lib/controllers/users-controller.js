'use strict';

module.exports = function(data) {
  return {
    getAll(req, res) {
      data.getAllUsers()
        .then(users => {
          if (users) {
            return res
              .status(200)
              .render('./users/index', { users });
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
                result: user,
                imageSrc: user.image || 'http://philosophy.ucr.edu/wp-content/uploads/2014/10/no-profile-img.gif',
                isAuthenticated: false,
                isLoggedIn: req.user ? true : false
              });
          }

          return res.status(400);
        });
    }
  };
};