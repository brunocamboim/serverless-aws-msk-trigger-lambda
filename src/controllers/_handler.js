'use strict';
//
// dependeNcies
const common  = require('common-lambda-tools');
// const aws     = require('aws-sdk');

// aws.config.update({
//   region          : 'us-east-1',
//   accessKeyId     : process.env.DYNAMO_ACCESS_KEY,
//   secretAccessKey : process.env.DYNAMO_ACCESS_SECRET
// });

const root = async (event) => {
  return common.responseHttp.success({
    headers: event.headers,
    body: {
      message: 'Ok'
    }
  });
};

/**
 * A function to test EventBridge
 * @param {*} event 
 */
const eventBridgeRoute = async (event) => {
  var params = {
    Entries: [ /* required */
      {
        // Event envelope fields
        Source: 'custom.testSend',
        EventBusName: 'test-event-bus',
        DetailType: 'Test-send',
        Time: new Date(),
  
        // Main event body
        Detail: JSON.stringify({entity: 'course', payload: {id: 1}})
      }
      /* more items */
    ]
  };

  await eventbridge.putEvents(params, function() {
    // console.log(err);
    // console.log(data);
  });

  return common.responseHttp.success({
    headers: event.headers,
    body: {
      message: 'Ok'
    }
  });
};

module.exports = {
  root,
  eventBridgeRoute
};