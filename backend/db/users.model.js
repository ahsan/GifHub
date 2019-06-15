const AWSClient = require('./aws');
const winston = require('../config/winston');

const tableName = 'Users';
const dynamoDB = new AWSClient.DynamoDB();
const dynamoDBDoc = new AWSClient.DynamoDB.DocumentClient();

const createTable = () => {
  winston.info(`Creating table ${tableName}`);

  const params = {
    TableName : tableName,
    KeySchema: [       
        { AttributeName: "email", KeyType: "HASH"},  //Partition key
        // { AttributeName: "name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "email", AttributeType: "S" },
        // { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDB.createTable(params, (err, data) => {
      if (err) {
        winston.error(`Could not create table ${tableName}`);
        winston.error(err.message);
        reject(err.message);
      } else {
        winston.info(`Created table ${tableName} successfully.`);
        resolve(data);
      }
    });
  });
}

const addNewUser = (userEmail) => {
  const params = {
    TableName: tableName,
    Item:{
        "email": userEmail,
        "gifUrlList": []
    }
  };
  
  winston.info(`Adding new user: ${userEmail}`);
  return new Promise((resolve, reject) => {

    getUser(userEmail).then((existingUser) => {
      if (existingUser) {
        return reject(`User ${userEmail} already exists.`);
      } else {
        dynamoDBDoc.put(params, (err, data) => {
          if (err) {
            winston.error(`Could not create a new user: ${userEmail}. Message: ${err.message}`);
            return reject(err.message);
          } else {
            winston.info(`Created new user: ${userEmail}.`);
            return resolve(data);
          }
        });
      }
    }).catch((err) => reject(err.message));
  });
}

const getUser = (userEmail) => {
  const params = {
    TableName: tableName,
    Key: {
        "email": userEmail
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDBDoc.get(params, (err, data) => {
      if (err) {
        winston.error(`Couldn't get user: ${userEmail}`);
        return reject(err.message);
      } else {
        return resolve(data.Item);
      }
    });
  });
}

const appendGifUrl = (userEmail, gifUrl) => {
  const params = {
    TableName: tableName,
    Key: { "email": userEmail },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #gifUrlList = list_append(if_not_exists(#gifUrlList, :empty_list), :gif)',
    ConditionExpression: "not contains (#gifUrlList, :gifUrl)",
    ExpressionAttributeNames: {
      '#gifUrlList': 'gifUrlList'
    },
    ExpressionAttributeValues: {
      ':gifUrl': gifUrl,
      ':gif': [gifUrl],
      ':empty_list': []
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDBDoc.update(params, (err, data) => {
      if (err) {
        winston.error(`Could not update user ${userEmail}.`);
        if (err.message == 'The conditional request failed') {
          reject('Gif already present');
        }
        reject(err.message);
      } else {
        resolve(data);
      }
    })
  });
}

const removeGif = (userEmail, toBeRemovedUrl) => {

  getUser(userEmail).then((user) => {
    console.log(user);
    const newGifsList = user.gifUrls.filter((url) => url !== toBeRemovedUrl);
    const params = {
      TableName: tableName,
      Key: { "email": userEmail },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'set #gifUrlList = :gifsList',
      ExpressionAttributeNames: {
        '#gifUrlList': 'gifUrlList'
      },
      ExpressionAttributeValues: {
        ':gifsList': newGifsList
      }
    };
  
    return new Promise((resolve, reject) => {
      dynamoDBDoc.update(params, (err, data) => {
        if (err) {
          winston.error(`Could not update user ${userEmail}.`);
          reject(err.message);
        } else {
          resolve(data);
        }
      })
    });
  });
}

module.exports.createTable = createTable;
module.exports.addNewUser = addNewUser;
module.exports.getUser = getUser;
module.exports.appendGifUrl = appendGifUrl;
module.exports.removeGif = removeGif;
