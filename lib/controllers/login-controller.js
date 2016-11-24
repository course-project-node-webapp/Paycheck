module.exports = function (userData) {
  function index(req, res) {
    res.render('./login/index');
  }

  return {
    index
  };
};