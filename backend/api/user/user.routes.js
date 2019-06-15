/*
 Binds routes for the user module.
*/

const express = require('express');
const controller = require('./user.controller');
const mw = require('../request.middlewares');

let router = new express.Router();

router.get('/', mw.verifyRequiredQueries(['userEmail']), controller.getUser);
router.put('/gif', mw.verifyRequiredParams(['userEmail', 'gifUrl']), controller.addGifToFavorites);
router.delete('/gif', mw.verifyRequiredParams(['userEmail', 'gifUrl']), controller.removeGifFromFavorites);

module.exports = router;