module.exports = function (userData) {
  function index(req, res) {
    res.render('./profile/index');
  }

  return {
    index
  };
};