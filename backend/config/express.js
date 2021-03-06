/*
 This file configures the express app.
 - Adds the body-parser middlewares
 - Adds the morgan requests logger
 - Binds the API routes
*/

const bodyParser = require('body-parser');
const cors = require('cors');

/**
 *
 * @param {*} app - The Express app object
 */
module.exports = function(app) {

  // parse the requests
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // allow cors
  app.use(cors());
  app.options('*', cors());

  // add morgan requests logger middleware
  require('./morgan')(app);

  // Bind API routes
  require('./routes')(app);
};