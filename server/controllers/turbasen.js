var express = require('express');

var app = express.Router();
var auth = require('./auth');
var helpers = require('../lib/helpers');

var ntb = require('turbasen');

var js = require('JSONStream');
var es = require('event-stream');

ntb.configure({USER_AGENT: 'Hytteadmin/' + require('../package.json').version});

app.use(function(req, res, next) {
  // @TODO validate user authentication
  next();
});

app.get('/cabin', function(req, res) {
  req.query.tilbyder = 'DNT';
  req.query['tags.0'] = 'Hytte';
  req.query.sort = 'navn';
  // @TODO set or validate req.query.grupper

  var cabins = ntb.steder(req.query);

  cabins.pipe(res);
  cabins.pipe(js.parse('documents.*')).pipe(es.mapSync(function(data) {
    //console.log(data);
  }));
});

app.post('/cabin', function(req, res) {
  // @TODO set private fields
  ntb.steder.post(req.body).pipe(res);
});

app.get('/cabin/:id', function(req, res) {
  // @TODO validate user authorization
  var cabin = ntb.steder.get(req.params.id);

  cabin.pipe(res);
  cabin.pipe(js.parse()).pipe(es.mapSync(function(data) {
    //console.log(data);
  }));
});

app.put('/cabin/:id', function(req, res) {
  // @TODO validate user authorization

  req.body.privat = req.body.privat || {};

  // UT is expecting a cababin type integer property in the private scope in
  // order to display the correct map icon for the cabin.
  req.body.privat.hyttetype = helpers.hyttetype(
    req.body.privat.hytteeier,
    req.body.betjeningsgrad
  );

  // In Turadmin we have separated cabin access between private and public
  // transportation. UT.no has not caught up with these changes, so for the time
  // being we have to make sure the old `adkomst` filed stays populated.
  req.body.adkomst = req.body.tilkomst.privat;

  // UT.no is expecting `senger` to be an object property in the private scope.
  req.body.privat.senger = req.body.senger;

  ntb.steder.put(req.params.id, req.body).pipe(res);
});


app.post('/photo', function(req, res) {
  ntb.bilder.post(req.body).pipe(res);
});

app.get('/photo/:id', function(req, res) {
  // @TODO validate user authorization
  ntb.bilder.get(req.params.id).pipe(res);
});

app.post('/photo/:id', function(req, res) {
  // @TODO validate user authorization
  ntb.bilder.patch(req.params.id, req.body).pipe(res);
});

app.put('/photo/:id', function(req, res) {
  // @TODO validate user authorization
  ntb.bilder.put(req.params.id, req.body).pipe(res);
});

app.get('/group', function(req, res) {
  req.query.sort = 'navn';

  var groups = ntb.grupper(req.query);

  groups.pipe(res);
  groups.pipe(js.parse('documents.*')).pipe(es.mapSync(function(data) {
    //console.log(data);
  }));
});

app.get('/group/:id', function(req, res) {
  // @TODO validate user authorization
  ntb.grupper.get(req.params.id).pipe(res);
});

app.get('/area', function(req, res) {
  var areas = ntb.områder(req.query);

  areas.pipe(res);
  areas.pipe(js.parse('documents.*')).pipe(es.mapSync(function(data) {
    //console.log(data);
  }));
});

app.get('/area/:id', function(req, res) {
  // @TODO validate user authorization
  ntb.områder.get(req.params.id).pipe(res);
});

module.exports = app;
