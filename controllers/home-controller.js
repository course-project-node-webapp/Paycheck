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

module.exports = {
<<<<<<<
  index,
  latest
};
=======
    index: (req,res) => {
        res.render('home/index');
    },
}
>>>>>>>