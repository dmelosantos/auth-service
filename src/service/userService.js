const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('../common/utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Method with access to DynamoDB to insert the backup data
 * @param cognitoUsername retrieved from the JWT
 * @param userEmail email retrieved from the JWT
 * @param backupData
 * @return {Promise<void>}
 */
const saveBackup = async (cognitoUsername, userEmail, backupData) => {
  const timestamp = new Date().toISOString();
  // DOUBT: does data.Users has multiple users with same parameters and conversations?
  // By the problem description it says "for ONE user"
  // I will not infer the data structure here, and will add the full json to dynamo table
  // the partition key would be an UUID-v1 and with this structure we can't do
  // index search to Users.[].id, which I would prefer to be my sort key

  // https://github.com/aws/aws-sdk-java/issues/1189
  // convert empty strings to null
  // with this structure as is dynamodb is not an good fit, maybe an DocumentDB or Mongo Atlas
  const modifiedBackupData = utils.removeEmptyStringFromJson(backupData);

  // TODO add dynamoose to use models
  const params = {
    TableName: process.env.tableName,
    Item: {
      id: uuid.v1(),
      cognitoUsername,
      email: userEmail,
      ...modifiedBackupData,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  return dynamoDb.put(params).promise();
};

/**
 * Method to get the user backup from the database
 *
 * @param userEmail
 * @return {PromiseResult<DocumentClient.QueryOutput, AWSError>}
 */
const getBackupByUserEmail = async (userEmail) => {
  const params = {
    TableName: process.env.tableName,
    IndexName: 'emailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': userEmail,
    },
  };

  return dynamoDb.query(params).promise();
};

module.exports = {
  saveBackup,
  getBackupByUserEmail,
};
