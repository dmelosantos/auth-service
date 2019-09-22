const logger = require('../common/logger');

/**
 * Lambda method responsible for receiving an user backup in JSON format
 * and adding it to the user backup table
 *
 * @param event
 * @param context
 * @return {{body: string, statusCode: number}}
 */
const importBackup = (event, context) => {
  logger.debug(event);
  logger.debug(context);
  return {
    statusCode: 200,
    body: 'HELLO',
  };
};

/**
 *
 * @param event
 * @param context
 * @return {{body: string, statusCode: number}}
 */
const exportBackup = (event, context) => {
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
