'use strict';

//
// dependencies
const common    = require('common-lambda-tools');
// const serviceDB = require('../services/topics.service');

module.exports = async (functionName, functionToExecute, event) => {
  try {
    // await serviceDB.openConnection();
    // await serviceDB.startTransaction();

    const result = await functionToExecute(event);
    // await serviceDB.commit();
    // await serviceDB.closeConnection();

    return common.responseHttp.success(result);
  } catch (error) {
    // await serviceDB.rollback();
    // await serviceDB.closeConnection();

    common.logger.error(functionName, error);
    return common.responseHttp.error(event, error);
  }
};
