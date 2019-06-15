/*
 This file configures the Winston logger and provides the logger object.
*/

const winston = require('winston');
const path = require('path');
const fs = require('fs');

// logs directory
const logDirectory = process.env.LOGS_DIR || 'logs';

// make the directory structure for logs
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const logs = path.join(logDirectory, 'app.log');

// set the logging level
let logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({filename: logs}),
    new winston.transports.Console({format: winston.format.simple()})
  ]
});

module.exports = logger;