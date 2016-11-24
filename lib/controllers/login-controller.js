module.exports = function () {
  function index(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('./profile');
    }

    return res.render('./login/index');
  }

  function redirectOnSuccess(req, res) {
    res
      .status(200)
      .json({
        redirectUrl: '/profile',
        message: `Welcome ${req.user.username}`
      });
  }

  return {
    index,
    redirectOnSuccess
  };
};