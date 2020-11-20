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

const createTopic = async () => {
  const admin = kafka.admin();
  try {
    await admin.connect();

    

    const result = await admin.createTopics({
      validateOnly: false,
      waitForLeaders: true,
      topics: [
        {
          topic: 'Users',
          replicationFactor: 3
        }
      ],
    });

    common.logger.info('topic created' + result);
    await admin.disconnect();
    return true;
  } catch (err) {
    common.logger.info('Error creating topic' + err);
    await admin.disconnect();
    return false;
  }
};

module.exports = {
  createTopic
};
