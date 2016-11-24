module.exports = function () {
  function index(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('./profile');
    }

    return res.render('./login/index');
  }

  return {
    index
  };
};