const jwt = require('jsonwebtoken');
const logger = require('../common/logger');
const userService = require('../service/userService');

/**
 * Lambda method responsible for receiving an user backup in JSON format
 * and adding it to the user backup table
 *
 * @param event
 * @param context
 * @return {{body: string, statusCode: number}}
 */
const importBackup = async (event, context) => {
  logger.debug(event);
  logger.debug(context);

  // TODO add json schema to validate the input
  // TODO do input scrubbing to avoid any security risk
  if (event && event.body && event.body.data) {
    const payload = event.body.data;

    const decodedJwt = jwt.decode(event.headers.Authorization);

    const result = await userService.saveBackup(decodedJwt['cognito:username'], decodedJwt.email, payload);
    console.log(result);
    return {
      statusCode: 200,
      body: 'msg.backup.success',
    };
  }
  return {
    statusCode: 500,
    body: 'error.backup.payload.no.data.field',
  };
};

/**
 *
 * @param event
 * @param context
 * @return {{body: string, statusCode: number}}
 */
const exportBackup = (event, context) => {
  // TODO add json schema to validate the input

  // TODO add dynamoose to use models

  logger.debug(event);
  logger.debug(context);
  return {
    statusCode: 200,
    body: 'HELLO',
  };
};

module.exports = {
  importBackup,
  exportBackup,
};
