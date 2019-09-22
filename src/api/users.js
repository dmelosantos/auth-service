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

    try {
      await userService.saveBackup(decodedJwt['cognito:username'], decodedJwt.email, payload);

      return {
        statusCode: 200,
        body: 'msg.backup.success',
      };
    } catch (err) {
      logger.error(err);
      // TODO filter dynamo messages
      return {
        statusCode: 500,
        body: 'error.users.save',
      };
    }
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
const exportBackup = async (event, context) => {
  logger.debug(event);
  logger.debug(context);

  const decodedJwt = jwt.decode(event.headers.Authorization);

  try {
    const result = await userService.getBackupByUserEmail(decodedJwt.email);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.log(err)
    logger.error(err);
    // TODO filter dynamo messages
    return {
      statusCode: 500,
      body: 'error.users.getBackup',
    };
  }
};

module.exports = {
  importBackup,
  exportBackup,
};
