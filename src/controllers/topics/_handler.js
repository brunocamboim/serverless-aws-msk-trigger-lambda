
'use strict';

//
// dependencies
const producerController = require('./producer.controller');
const consumerController = require('./consumer.controller');
const _runSafe           = require('../../utils/runSafe.util');

const produceTopicsRoute = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await _runSafe('produceTopicsRoute', producerController.produceTopics, event);
};

const produceTopicsTransactionRoute = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await _runSafe('produceTopicsTransactionRoute', producerController.produceTopicsTransaction, event);
};

const consumeTopicsRoute = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await _runSafe('consumeTopicsRoute', consumerController.consumeTopics, event);
};

const consumeTopicsTriggerRoute = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await _runSafe('consumeTopicsTriggerRoute', consumerController.consumeTopicsTrigger, event);
};

module.exports = {
  produceTopicsRoute,
  produceTopicsTransactionRoute,
  consumeTopicsRoute,
  consumeTopicsTriggerRoute
};