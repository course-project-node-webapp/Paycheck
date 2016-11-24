module.exports = function (userData) {
  function index(req, res) {
    res.render('./project/index');
  }

  return {
    index
  };
};