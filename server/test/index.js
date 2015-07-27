var redis = require('../db/redis');
var assert = require('assert');
var request = require('supertest');
var app = request(require('../'));

module.exports.user = {
  cookie: [
    'connect.sid=s%3AZUrmT02ytf4IKS2sLB7RKyeEQEN7pIkk',
    'Mf%2B9hRocrzpevoN%2FFpLBKW6N0QjqHm3wzf2m8YKpPD8;'
  ].join('.'),
  object: {
    navn: process.env.NTB_USER_NAME,
    epost: process.env.NTB_USER_EMAIL,
    gruppe: {
      _id: '52407f3c4ec4a138150001d7',
      navn: 'Destinasjon Trysil',
      tilbyder: 'DNT',
      endret: '2015-03-27T13:21:57.182Z',
      status: 'Offentlig',
      lisens: 'CC BY-NC 4.0'
    }
  }
};

beforeEach(function(done) {
  redis.flushall(done);
});

beforeEach(function(done) {
  var key = 'sess:ZUrmT02ytf4IKS2sLB7RKyeEQEN7pIkk';
  var val = JSON.stringify({
    cookie: {
      path: '/',
      expires: null,
      originalMaxAge: null,
      httpOnly: true
    },
    user: module.exports.user.object
  });

  redis.set(key, val, done);
});
