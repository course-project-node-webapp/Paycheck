'use strict';

const controllers = require('../controllers');

module.exports = function(app) {
    app.get('/', controllers.home.index);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('Page not found.');
        res.end();
    });
}