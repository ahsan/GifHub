/*
 Configures the express app to use Morgan requests logger.
*/

const fs = require('fs')
const morgan = require('morgan')
const path = require('path')


/**
 * Adds the morgan logger to express app
 * @param {*} app - The Express app object
 */
module.exports = function(app) {
  const logDir = process.env.LOGS_DIR || 'logs';
  const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }))
};