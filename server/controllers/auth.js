var app = require('express').Router();

process.env.NTB_USER_AGENT = 'Hytteadmin/' + require('../package.json');
var turbasen = require('turbasen-auth');

process.env.DNT_CONNECT_USER_AGENT = 'Hytteadmin/' + require('../package.json');
var Connect = require('dnt-connect');
var connect = new Connect(
  process.env.DNT_CONNECT_CLIENT,
  process.env.DNT_CONNECT_KEY
);

process.env.DNT_API_USER_AGENT = 'Hytteadmin/' + require('../package.json');
var DntApi = require('dnt-api');
var dntApi = new DntApi(process.env.DNT_API_USER_AGENT, process.env.DNT_API_KEY);

app.get('/', function(req, res) {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401);
    res.json({authenticated: false});
  }
});

app.get('/login/dnt', connect.middleware('signon'), function(req, res, next) {
  if (!req.dntConnect)  {
    var err = new Error('DNT Connect: unknown error');
    err.status = 500;
    next(err);
  }

  if (req.dntConnect.err || !req.dntConnect.data.er_autentisert) {
    // @TODO redierect back to login page with error message
    return res.redirect('/login');
  }

  req.session.user = {
    id: 'sherpa3:' + req.dntConnect.data.sherpa_id,
    navn: req.dntConnect.data.fornavn + ' ' + req.dntConnect.data.etternavn,
    epost: req.dntConnect.data.epost,
    grupper: [] // @TODO get the groups
  };

  res.redirect('/hytter');
});

app.post('/login/turbasen', turbasen.middleware, function(req, res, next) {
  if (req.turbasenAuth) {
    req.session.user = req.turbasenAuth;
    res.status(200);
    res.json(req.session.user);
  } else {
    req.session.destroy(function(err) {
      if (!err) {
        err = new Error('Invalid email or password');
        err.status = 401;
      }

      return next(err);
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
