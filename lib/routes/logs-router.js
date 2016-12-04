'use strict';

const fs = require('fs');

module.exports = function ({app, express}) {
  const logsRouter = new express.Router();
  logsRouter
    .get('/', (req, res) => {
      const logContent = fs.readFileSync('./logs/all-logs.log');
      res.send(logContent);
    });

  app.use('/logs', logsRouter);
};