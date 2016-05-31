'use strict';

const version = require('../package.json').version;
const router = require('express').Router;
const app = router();

const userAgent = `Hytteadmin/${version}`;
process.env.NTB_USER_AGENT = userAgent;
process.env.DNT_CONNECT_USER_AGENT = userAgent;
process.env.DNT_API_USER_AGENT = userAgent;

const Turbasen = require('turbasen-auth');
const DntConnect = require('dnt-connect');
const DntApi = require('dnt-api');

const connect = new DntConnect(
  process.env.DNT_CONNECT_CLIENT,
  process.env.DNT_CONNECT_KEY
);

const dntApi = new DntApi(
  process.env.DNT_API_USER_AGENT,
  process.env.DNT_API_KEY
);

app.get('/', (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401);
    res.json({ authenticated: false });
  }
});

app.get('/login/dnt', connect.middleware('signon'));
app.get('/login/dnt', (req, res, next) => {
  if (!req.dntConnect) {
    const err = new Error('DNT Connect: unknown error');
    err.status = 500;
    return next(err);
  }

  if (req.dntConnect.err || !req.dntConnect.data.er_autentisert) {
    // @TODO redierect back to login page with error message
    return res.redirect('/login');
  }

  req.session.user = {
    id: `sherpa3:${req.dntConnect.data.sherpa_id}`,
    brukertype: 'DNT',
    navn: `${req.dntConnect.data.fornavn} ${req.dntConnect.data.etternavn}`,
    epost: req.dntConnect.data.epost,
    er_admin: false,
    grupper: [],
  };

  return next();
});

app.get('/login/dnt', (req, res) => {
  const user = {
    bruker_sherpa_id: req.dntConnect.data.sherpa_id,
  };

  dntApi.getAssociationsFor(user, (err, statusCode, associations) => {
    let isAdmin = false;
    const groups = [];

    if (err) { throw err; }
    if (statusCode === 200) {
      for (let i = 0; i < associations.length; i++) {
        if (associations[i].object_id) {
          groups.push(associations[i]);
        }
        if (!isAdmin && associations[i].navn === 'Den Norske Turistforening') {
          isAdmin = true;
        }
      }

      req.session.user.er_admin = isAdmin;
      req.session.user.grupper = groups;
    } else {
      throw new Error(`Request to DNT API failed: ${statusCode}`);
    }

    res.redirect('/');
  });
});

app.post('/login/turbasen', Turbasen.middleware);
app.post('/login/turbasen', (req, res, next) => {
  if (req.turbasenAuth) {
    req.session.user = req.turbasenAuth;
    req.session.user.brukertype = 'Gruppe';
    res.status(200);
    res.json(req.session.user);
  } else {
    req.session.destroy(err => {
      if (!err) {
        const error = new Error('Invalid email or password');
        error.status = 401;

        return next(error);
      }

      return next(err);
    });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) { throw err; }

    res.status(204).end();
  });
});

module.exports = app;
