'use strict';

module.exports = function (userData) {
  function index(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('../profile');
    }

    return res.render('./login/index');
  }

  function logOut(req, res) {
    req.logout();
    res.redirect('/');
  }

  function redirectOnSuccess(req, res) {
    res
      .status(200)
      .json({
        redirectUrl: '/profile',
        message: `Welcome ${req.user.username}`
      });
  }

  function userDetails(req, res) {
    const userId = req.params.userId;
    const isAuthenticated = req.isAuthenticated();

    userData.getUserById(userId)
      .then((user) => {
        res.render('./profile/index', {
          isAuthenticated,
          result: {
            user
          }
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  return {
    index,
    logOut,
    redirectOnSuccess,
    userDetails
  };
};