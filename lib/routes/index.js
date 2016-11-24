const attachHomeRouter = require('./home-router');
const attachLoginRouter = require('./login-router');
const attachProjectRouter = require('./project-router');

module.exports = function(app, data) {
    attachHomeRouter(app);
    attachLoginRouter(app, data.userData);
    attachProjectRouter(app, data.userData);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('Page not found.');
        res.end();
    });
};