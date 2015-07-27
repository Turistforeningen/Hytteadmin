var app = require('express').Router();

process.env.NTB_API_USERAGENT = 'Hytteadmin/' + require('../package.json');
var turbasen = require('turbasen-auth');

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

app.post('/login/turbasen', turbasen.middleware, function(req, res) {
  if (req.turbasenAuth) {
    req.session.user = req.turbasenAuth;
    res.status(200);
    res.json(req.session.user);
  } else {
    req.session.destroy(function(err) {
      if (err) { throw err; }

      res.status(401);
      res.json({message: 'Invalid email or password'});
    });
  }
});

app.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) { throw err; }

    res.status(204).end();
  });
});


module.exports = app;
