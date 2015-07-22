var app = require('express').Router();

var TurbasenAuth = require('turbasen-auth');

var appName = 'Hytteadmin/' + require('../package.json');
var apiKey = process.env.NTB_API_KEY;
var ntbEnv = process.env.NTB_API_ENV;
var turbasen = new TurbasenAuth(appName, apiKey, {env: ntbEnv});

app.get('/', function(req, res) {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401);
    res.json({authenticated: false});
  }
});

app.get('/login/sherpa/signon', function(req, res) {
  throw new Error('Not Implemented');
});

app.get('/login/sherpa/callback', function(req, res) {
  throw new Error('Not Implemented');
});

app.post('/login/turbasen', function(req, res) {
  if (req.body && req.body.email && req.body.password) {
    turbasen.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err) { throw err }

      if (user) {
        req.session.user = user;
        res.status(200);
        res.json(req.session.user);
      } else {
        req.session.user = undefined;
        res.status(401);
        res.json({message: 'Invalid email or password'});
      }
    });
  } else {
    res.status(400);
    res.json({message: 'The fields "email" and "password" are required'});
  }
});

app.post('/logout', function(req, res) {
  throw new Error('Not Implemented');
});


module.exports = app;
