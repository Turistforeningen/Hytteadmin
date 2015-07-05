var express = require('express');

var app = express.Router();

app.get('/', function(req, res) {
  res.json({
    name: 'Ola Nordmann',
    email: 'ola.nordmann@norge.no',
    groups: {
      'abc123': 'Turlag 1',
      'def456': 'Turlag 2'
    }
  });
});

app.get('/login/sherpa/signon', function(req, res) {
  throw new Error('Not Implemented');
});

app.get('/login/sherpa/callback', function(req, res) {
  throw new Error('Not Implemented');
});

app.post('/login/turbasen', function(req, res) {
  throw new Error('Not Implemented');
});

app.post('/logout', function(req, res) {
  throw new Error('Not Implemented');
});


module.exports = app;
