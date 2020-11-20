'use strict';

//
// dependencies
const common        = require('common-lambda-tools');
const KafkaService  = require('kafkajs');

const adminKafka    = require('../../services/admin-kafka.service');

const kafka = new KafkaService.Kafka({
  clientId: 'my-app-producer',
  brokers : [
    'YOUR-BROKER-URL:9094',
    'YOUR-SECOND-BROKER-URL:9094',
    'YOUR-THIRD-BROKER-URL:9094'
  ],
  ssl: true,
});

const produceTopics = async (event) => {
  try {
    await adminKafka.createTopic();

    const producer = kafka.producer(
      {
        allowAutoTopicCreation: true
      }
    );
    await producer.connect();

    const json = JSON.stringify({
      id  : event.body.user_id,
      name: event.body.user_name,
    });

    const retorno = await producer.send({
      topic   : 'Users',
      messages: [{ value: `"${json}"` }],
    });

    return new common.customResponse(retorno);
  } catch (err) {
    common.logger.error('produceTopics', err);
    throw err;
  }
};

/**
 * See: https://kafka.js.org/docs/transactions
 * @param {*} event 
 */
const produceTopicsTransaction = async (event) => {
  let transaction;
  
  try {
    const producer = kafka.producer({
      maxInFlightRequests : 1,
      idempotent          : true,
      transactionalId     : 'send-users-to-kafka'
    });
    
    transaction = await producer.transaction();

    const json = JSON.stringify({
      id  : event.body.user_id,
      name: event.body.user_name,
    });

    const retorno = await transaction.send({
      topic   : 'Users',
      messages: [{ value: `"${json}"` }, { value: 'teste 2' }],
    });

    await transaction.commit();

    return new common.customResponse(retorno);
  } catch (err) {
    if (transaction) {
      await transaction.abort();
    }

    common.logger.error('produceTopicsTransaction', err);
    throw err;
  }
};

module.exports = {
  produceTopics,
  produceTopicsTransaction
};
