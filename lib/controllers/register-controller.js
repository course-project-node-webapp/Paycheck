'use strict';

module.exports = function (userData, logger) {
  function index(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      return res.redirect('/');
    }

    return res
      .status(200)
      .render('./register/index', {
        isAuthenticated,
        result: {
          user: req.user
        }
      });
  }

  function register(req, res) {
    const user = req.body;
    return userData.getUserByUsername(user.username)
      .then((foundUser) => {
        if (foundUser) {
          throw new Error('Username already exists.');
        }

        return userData.createUser(user);
      })
      .then((userModel) => {
        res
          .status(201)
          .json({
            redirectUrl: '/profile',
            message: `Welcome ${userModel.username}`
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res
          .status(400)
          .json({
            message: err.message
          });
      });
  }

  return {
    index,
    register
  };
};