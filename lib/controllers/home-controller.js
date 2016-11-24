'use strict';

function index(req, res) {
  res
    .status(200)
    .render('./home/index');

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