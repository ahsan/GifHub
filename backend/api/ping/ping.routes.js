/*
 Binds routes for the ping module.
*/

const express = require('express');
const controller = require('./ping.controller');

let router = new express.Router();
router.get('/', controller.pong);

module.exports = router;