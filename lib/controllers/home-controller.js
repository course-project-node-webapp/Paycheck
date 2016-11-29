'use strict';

function index(req, res) {
  if (req.user) {
    res
      .status(200)
      .redirect('./profile');
  } else {
    res
      .status(200)
      .render('./home/index', {
        result: {
          user: req.user
        }
      });
  }
}

function latest(req, res) {
  // TODO: 
  res
    .status(200)
    .send('latest news');
}

function login() {

}

module.exports = {
  index,
  latest
};