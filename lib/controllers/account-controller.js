'use strict';

module.exports = function (userData, logger) {
  function index(req, res) {
    return res.status(200).render('./login/index', {
      result: {
        user: req.user
      }
    });
  }

  function logOut(req, res) {
    req.logout();
    res.status(200).redirect('/');
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
    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    let isAuthenticated = req.isAuthenticated();
    let userId = req.params.userId;

    return userData.getUserById(userId)
      .then((user) => {
        if (!user) {
          logger.info(`Organization with ID: ${userId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        return res.status(200)
          .render('./profile/index', {
            isAuthenticated,
            result: {
              user
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  return {
    index,
    logOut,
    redirectOnSuccess,
    userDetails
  };
};