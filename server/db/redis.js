'use strict';

const redisHostname = process.env.REDIS_HOSTNAME
  ? process.env.REDIS_HOSTNAME
  : 'redis';

module.exports = require('redis').createClient(6379, redisHostname);
