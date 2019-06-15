/*
 This file defines and binds the API routes.
*/

const winston = require('./winston');

/**
 *
 * @param {*} app - The Express app object
 */
module.exports = function (app) {

    // bind routes to all api endpoints
    winston.debug(`Binding routes`);
    app.use(`/ping`, require(`../api/ping/ping.routes`));

    // default route
    app.route('/*').get((req, res) => {
        winston.verbose('Illegal API endpoint hit: ', req.url);

        // respond with 404
        res.status(404);
        res.json({
            message: 'API endpoint not implemented.'
        });

    });
};