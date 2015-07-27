var assert = require('assert');
var request = require('supertest');
var app = request(require('../../'));

var auth = null;
var name = process.env.NTB_USER_NAME;
var email = process.env.NTB_USER_EMAIL;
var pass = process.env.NTB_USER_PASSWORD;

before(function(done) {
  this.timeout(5000);

  app.post('/auth/login/turbasen')
    .send({email: email, password: pass})
    .expect(function(res) {
      auth = res.headers['set-cookie'][0].split(' ')[0];
    })
    .end(done);
});

describe('POST /auth/login/turbasen', function() {
  it('returns 401 for no email or password', function(done) {
    app.post('/auth/login/turbasen')
      .expect(401)
      .expect({message: 'Invalid email or password'}, done);
  });

  it('returns 401 for invalid user credentials', function(done) {
    app.post('/auth/login/turbasen')
      .send({email: 'foo@bar.com', password: 'foobar'})
      .expect(401)
      .expect({message: 'Invalid email or password'}, done)
  });

  it('returns 200 for valid user credentials', function(done) {
    this.timeout(5000);

    app.post('/auth/login/turbasen')
      .send({email: email, password: pass})
      .expect(200)
      .expect({
        navn: name,
        epost: email,
        gruppe: {
          _id: '52407f3c4ec4a138150001d7',
          endret: '2015-03-27T13:21:57.182Z',
          lisens: 'CC BY-NC 4.0',
          navn: 'Destinasjon Trysil',
          status: 'Offentlig',
          tilbyder: 'DNT'
        }
      }, done);
  });
});

describe('GET /auth', function() {
  it('returns 401 for unauthenticated user', function(done) {
    app.get('/auth').expect(401).expect({authenticated: false}, done);
  });

  it('returns 200 for authenticated user', function(done) {
    app.get('/auth')
      .set('cookie', auth)
      .expect(200)
      .expect({
        navn: name,
        epost: email,
        gruppe: {
          _id: '52407f3c4ec4a138150001d7',
          endret: '2015-03-27T13:21:57.182Z',
          lisens: 'CC BY-NC 4.0',
          navn: 'Destinasjon Trysil',
          status: 'Offentlig',
          tilbyder: 'DNT'
        }
      }, done);
  });
});

describe('POST /auth/logout', function() {
  it('returns 204 when logging out', function(done) {
    app.post('/auth/logout').set('cookie', auth).expect(204, done);
  });

  it('return 401 for GET /auth', function(done) {
    app.get('/auth').set('cookie', auth).expect(401, done);
  });
});
