'use strict';

module.exports = function(data) {
  return {
    getAll(req, res) {
      data.getAllUsers()
        .then(users => {
          // TODO:
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

          return res.status(401);
        });
    },
    create(req, res) {
      let body = req.body;
      data.createUser(body.user)
        .then(() => {
          // TODO: 
        });
    }
  };
};