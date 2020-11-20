'use strict';

//
// dependencies
const common        = require('common-lambda-tools');
const KafkaService  = require('kafkajs');

const kafka = new KafkaService.Kafka({
  clientId: 'my-app-producer',
  brokers : [
    'YOUR-BROKER-URL:9094',
    'YOUR-SECOND-BROKER-URL:9094',
    'YOUR-THIRD-BROKER-URL:9094'
  ],
  ssl: true,
});

/**
 * 
 * @param {Object} event - {
    "eventSource": "aws:kafka",
    "eventSourceArn": "ARN",
    "records": {
      "AWSKafkaTopic-0": [
        {
          "topic": "AWSKafkaTopic",
          "partition": 0,
          "offset": 0,
          "timestamp": 1595035749700,
          "timestampType": "CREATE_TIME",
          "key": "",
          "value": ""
        }
      ]
    }
  } 
 */
const consumeTopicsTrigger = async (event) => {
  try {
    common.logger.info(JSON.stringify(event));
    for (const key in event.records) {
      common.logger.info('Key: ', key);

      // Iterate through records
      event.records[key].map((record) => {
        common.logger.info('Record: ', record);

        // Decode base64
        const msg = Buffer.from(record.value, 'base64').toString();
        common.logger.info('Message:', msg);
        const message = JSON.parse(msg);
        if (message.error) {
          throw new Error('Property error sent');
        }
      });
    }

    return new common.customResponse({}, 204);
  } catch (err) {
    common.logger.error('produceTopicsTrigger', err);
    throw err;
  }
};

const consumeTopics = async (event) => {
  try {
    common.logger.info(JSON.stringify(event));
    const consumer = kafka.consumer({ groupId: 'core-kafka' });
    
    await consumer.connect();

    // You can use multiples subscribers
    await consumer.subscribe({ topic: 'Users' });

    common.logger.info('Executar teste... ');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        common.logger.info({
          key     : message.key.toString(),
          value   : message.value.toString(),
          topic,
          partition
        });
      }
    });

    return new common.customResponse({}, 204);
  } catch (err) {
    common.logger.error('produceTopics', err);
    throw err;
  }
};

module.exports = {
  consumeTopics,
  consumeTopicsTrigger
};
