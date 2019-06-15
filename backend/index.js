/*
 Entrypoint for the application.
 This file boostraps all the config and the API.
*/

// load the environment variables before doing anything else
require('dotenv').config({path: './.env'});

const express = require('express');

// create an express app
const app = express();

// configure and start the HTTP server
require('./config/server')(app);

// apply express configuration
require('./config/express')(app);


module.exports = app;