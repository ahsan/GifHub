const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT
});

module.exports = AWS;