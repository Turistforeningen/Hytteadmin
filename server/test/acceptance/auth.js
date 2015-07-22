var assert = require('assert');
var request = require('supertest');
var app = request(require('../../'));

var auth = null;
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
  it('returns 400 for no email or password', function(done) {
    app.post('/auth/login/turbasen').expect(400).expect({
      message: 'The fields "email" and "password" are required'
    }, done);
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
        navn: 'Destinasjon Trysil',
        epost: email,
        gruppe: {
          _id: '52407f3c4ec4a138150001d7',
          navn: 'Destinasjon Trysil'
        }
      }, done);
  });
});

describe.only('GET /auth', function() {
  it('returns 401 for unauthenticated user', function(done) {
    app.get('/auth').expect(401).expect({authenticated: false}, done);
  });

  it('returns 200 for authenticated user', function(done) {
    app.get('/auth')
      .set('cookie', auth)
      .expect(200)
      .expect({
        navn: 'Destinasjon Trysil',
        epost: email,
        gruppe: {
          _id: '52407f3c4ec4a138150001d7',
          navn: 'Destinasjon Trysil'
        }
      }, done);
  });
});
