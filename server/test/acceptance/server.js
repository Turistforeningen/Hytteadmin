var request = require('supertest');
var app = request(require('../../'));

describe('GET /', function() {
  it('returns 404 for index', function(done) {
    app.get('/').expect(404, done);
  });
});
