var assert = require('assert');
var request = require('supertest');
var app = request(require('../../'));

describe('GET /api/v1/cabin', function() {
  it('returns list of cabins', function(done) {
    app.get('/api/v1/cabin').expect(200, done);
  });
});

describe('POST /api/v1/cabin', function() {
  it('creates a new cabin');
  it('sets privat.hyttetype');
  it('maps tilkomst.privat to adkomst');
});

describe('GET /api/v1/cabin/:id', function() {
  this.timeout(5000);

  it('returns 404 for non-existing cabin', function(done) {
    app.get('/api/v1/cabin/000000000000000000000000').expect(404, done);
  });

  it('returns data for existing cabin', function(done) {
    app.get('/api/v1/cabin/52407fb375049e5615000118')
      .expect(200)
      .expect(function(res) {
        assert.equal(res.body.navn, 'Selhamar');
      })
      .end(done);
  });
});

describe('POST /api/v1/cabin/:id', function() {
  it('updates an existing cabin');
});

describe('DELETE /api/v1/cabin/:id', function() {
  it('deletes an existing cabin');
});
