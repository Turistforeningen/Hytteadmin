'use strict';

const router = require('express').Router;
const app = router();

const helpers = require('../lib/helpers');

const version = require('../package.json').version;
const ntb = require('turbasen');

// const js = require('JSONStream');
// const es = require('event-stream');

ntb.configure({ USER_AGENT: `Hytteadmin/${version}` });

app.use((req, res, next) => {
  // @TODO validate user authentication
  next();
});

app.get('/cabin', (req, res) => {
  req.query.tilbyder = 'DNT';
  req.query['tags.0'] = 'Hytte';
  req.query.sort = 'navn';
  // @TODO set or validate req.query.grupper

  const cabins = ntb.steder(req.query);

  cabins.pipe(res);
  // cabins.pipe(js.parse('documents.*')).pipe(es.mapSync((data) => {
  //   //console.log(data);
  // }));
});

app.post('/cabin', (req, res) => {
  // @TODO validate user authentication
  req.body = helpers.utify(req.body);

  ntb.steder.post(req.body).pipe(res);
});

app.get('/cabin/:id', (req, res) => {
  // @TODO validate user authorization
  const cabin = ntb.steder.get(req.params.id);

  cabin.pipe(res);
  // cabin.pipe(js.parse()).pipe(es.mapSync((data) => {
  //   //console.log(data);
  // }));
});

app.put('/cabin/:id', (req, res) => {
  // @TODO validate user authorization
  req.body = helpers.utify(req.body);

  ntb.steder.put(req.params.id, req.body).pipe(res);
});

app.delete('/cabin/:id', (req, res) => {
  // @TODO validate user authorization

  ntb.steder.delete(req.params.id).pipe(res);
});

app.post('/photo', (req, res) => {
  ntb.bilder.post(req.body).pipe(res);
});

app.get('/photo/:id', (req, res) => {
  // @TODO validate user authorization
  ntb.bilder.get(req.params.id).pipe(res);
});

app.post('/photo/:id', (req, res) => {
  // @TODO validate user authorization
  ntb.bilder.patch(req.params.id, req.body).pipe(res);
});

app.put('/photo/:id', (req, res) => {
  // @TODO validate user authorization
  ntb.bilder.put(req.params.id, req.body).pipe(res);
});

app.get('/group', (req, res) => {
  req.query.sort = 'navn';

  const groups = ntb.grupper(req.query);

  groups.pipe(res);
  // groups.pipe(js.parse('documents.*')).pipe(es.mapSync((data) => {
  //   //console.log(data);
  // }));
});

app.get('/group/:id', (req, res) => {
  // @TODO validate user authorization
  ntb.grupper.get(req.params.id).pipe(res);
});

app.get('/area', (req, res) => {
  const areas = ntb.områder(req.query);

  areas.pipe(res);
  // areas.pipe(js.parse('documents.*')).pipe(es.mapSync((data) => {
  //   //console.log(data);
  // }));
});

app.get('/area/:id', (req, res) => {
  // @TODO validate user authorization
  ntb.områder.get(req.params.id).pipe(res);
});

module.exports = app;
