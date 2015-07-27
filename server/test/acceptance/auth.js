var assert = require('assert');
var request = require('supertest');
var config = require('../.');
var app = request(require('../../'));

describe('GET /auth', function() {
  it('returns 401 for unauthenticated user', function(done) {
    app.get('/auth').expect(401).expect({authenticated: false}, done);
  });

  it('returns 200 for authenticated user', function(done) {
    app.get('/auth')
      .set('cookie', config.user.cookie)
      .expect(200)
      .expect(config.user.object, done);
  });
});

describe('POST /auth/login/turbasen', function() {
  var email = process.env.NTB_USER_EMAIL;
  var pass = process.env.NTB_USER_PASSWORD;

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
      .expect(config.user.object, done);
  });

  it('returns valid user session cookie', function(done) {
    this.timeout(5000);

    app.post('/auth/login/turbasen')
      .send({email: email, password: pass})
      .end(function(err, res) {
        var cookie = res.headers['set-cookie'][0].split(' ')[0];
        app.get('/auth').set('cookie', cookie).expect(200, done);
      });
  });
});

describe('POST /auth/logout', function() {
  it('returns 204 when logging out', function(done) {
    app.post('/auth/logout').set('cookie', config.user.cookie).expect(204, done);
  });

  it('return 401 for GET /auth', function(done) {
    app.post('/auth/logout').set('cookie', config.user.cookie).end(function() {
      app.get('/auth').set('cookie', config.user.cookie).expect(401, done);
    });
  });
});
