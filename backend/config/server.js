/*
 This file configures and starts the http server
*/

const http = require('http');
const winston = require('./winston');

/**
 * Creates an HTTP server listening on port and returns the server object.
 * @param {*} expressApp - The Express app object
 * @returns http server
 */
module.exports = function (expressApp) {

  const server = http.createServer(expressApp);

  // read the api port from env variables
  const port = process.env.API_PORT || 3000;

  // start listening
  server.listen(port);

  // handle error
  server.on('error', function (error) {
    switch (error.code) {
      case 'EACCESS':
        winston.error(`Port '${port}' is not accessible. Exiting.`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        winston.error(`Port '${port}' is already in use. Exiting.`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  // log succesful server init
  server.on('listening', function () {
    winston.info(`Server started on address: http://localhost:${port}`);
  });

  return server;
}