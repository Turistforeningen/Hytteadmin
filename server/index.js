'use strict';

if (process.env.NODE_ENV === 'production') {
  /* eslint-disable no-console */
  console.log('Starting newrelic application monitoring');
  /* eslint-enable */
  require('newrelic'); // eslint-disable-line global-require
}

const express = require('express');
const app = module.exports = express();

const redis = require('./db/redis');
const raven = require('raven').middleware.express;
const patchGlobal = require('raven').patchGlobal;
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);

if (process.env.SENTRY_DSN === 'production') {
  patchGlobal(process.env.SENTRY_DSN, (err) => {
    /* eslint-disable no-console */
    console.error(err);
    console.error(err.stack);
    /* eslint-enable */

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
  store: new RedisStore({ client: redis }),
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
  /* eslint-disable no-console */
  console.log(`Backend started on port ${process.env.APP_PORT}`);
  /* eslint-enable */
}
