module.exports = function (userData) {
  function index(req, res) {
    res
      .status(200)
      .render('./register/index');
  }

  return {
    index
  };
};