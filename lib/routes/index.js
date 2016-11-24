const attachHomeRouter = require('./home-router');

module.exports = function (app) {
  attachHomeRouter(app);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('Page not found.');
    res.end();
  });
};