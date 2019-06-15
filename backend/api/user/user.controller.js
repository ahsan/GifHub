/*
Defines controllers for the ping routes.
*/

const User = require('../../db/users.model');

// Returns the user object
exports.getUser = function (req, res) {
  User.getUser(req.query.userEmail).then((user) => {
    res.status(200).json({user});
  }).catch((error) => {
    res.status(400).json({error});
  });
};

// Adds a gif url to the favorites list
exports.addGifToFavorites = function (req, res) {
  User.appendGifUrl(req.body.userEmail, req.body.gifUrl)
    .then((update) => res.status(200).json({update}))
    .catch(error => res.status(400).json({error}));
};

// Removes a gif url from the favorites list
exports.removeGifFromFavorites = function (req, res) {
  User.removeGif(req.body.userEmail, req.body.gifUrl)
    .then((update) => res.status(200).json({update}))
    .catch(error => res.status(400).json({error}));
};