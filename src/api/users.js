const logger = require('../common/logger');

const importBackup = (event, context) => {
  logger.debug(event);
  logger.debug(context);
  return {
    statusCode: 200,
    body: 'HELLO',
  };
};

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
