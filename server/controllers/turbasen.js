var express = require('express');

var app = express.Router();
var auth = require('./auth');

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

app.post('/cabin/:id', function(req, res) {
  // @TODO validate user authorization
  // @TODO set private fields
  ntb.steder.patch(req.params.id, req.body).pipe(res);
});


app.post('/photo', function(req, res) {
  ntb.bilder.post(req.body).pipe(res);
});

app.get('/photo/:id', function(req, res) {
  // @TODO validate user authorization
  ntb.bilder.get(req.params.id).pipe(res);
});

app.post('/photo/:d', function(req, res) {
  // @TODO validate user authorization
  ntb.bilder.patch(req.params.id, req.body).pipe(res);
});


module.exports = app;
