'use strict';
module.exports = function (userData) {
  function index(req, res) {
    res
      .status(200)
      .render('./register/index');
  }

  function register(req, res) {
    const user = req.body;
    return userData.createUser(user)
      .then((userModel) => {
        res
          .status(201)
          .json({
            redirectUrl: '/profile',
            message: `Welcome ${userModel.username}`
          });
      })
      .catch((err) => {
        console.log(`${new Date().toString()} ${err.message}`);

        res
          .status(400)
          .json({
            message: 'Error'
          });
      });
  }

  return {
    index,
    register
  };
};