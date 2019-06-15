/*
Defines controllers for the ping routes.
*/

/**
 * Returns 'pong' message with the current time to a ping request.
 * @param req: the request object
 * @param res: the response object
 * @return A JSON object containing response code, message and
 * current server time.
 */
exports.pong = function (req, res) {
  res.status(200).json({
    message: 'pong',
    time: new Date().toString()
  });
};