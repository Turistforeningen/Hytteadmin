/* eslint no-console: 0 */
'use strict';

if (process.env.NODE_ENV === 'production') {
  console.log('Starting newrelic application monitoring');
  require('newrelic');
}

const express = require('express');
const app = module.exports = express();

const raven = require('raven').middleware.express;
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);

if (process.env.SENTRY_DSN === 'production') {
  require('raven').patchGlobal(process.env.SENTRY_DSN, function globalError(err) {
    console.error(err);
    console.error(err.stack);

    process.exit(1);
  });
}

app.set('json spaces', 2);
app.set('x-powered-by', false);
app.set('etag', false);

app.use(raven.requestHandler(process.env.SENTRY_DSN));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  store: new RedisStore({ client: require('./db/redis') }),
  secret: process.env.SECRET || 'this is not secret',
  resave: false,
  saveUninitialized: false,
}));

app.use('/auth', require('./controllers/auth'));
app.use('/api/v1', require('./controllers/turbasen'));

app.use(raven.errorHandler(process.env.SENTRY_DSN));
app.use(require('@turistforeningen/express-error'));

if (!module.parent) {
  app.listen(process.env.APP_PORT);
  console.log('Backend started on port ' + process.env.APP_PORT);
}
