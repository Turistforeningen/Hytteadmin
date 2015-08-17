'use strict';

const assert = require('assert');
const helpers = require('../lib/helpers');

describe('helpers', function() {
  describe('hyttetype()', function() {
    it('returns undefined for undefined service', function() {
      assert.equal(helpers.hyttetype('DNT'), undefined);
    });

    it('returns undefined for unknown service', function() {
      assert.equal(helpers.hyttetype('DNT', 'foobar'), undefined);
    });

    it('returns value for undefined owner', function() {
      assert.equal(helpers.hyttetype(undefined, 'Betjent'), 1006);
    });

    it('returns value for owner and service', function() {
      assert.equal(helpers.hyttetype('DNT', 'Betjent'), 1002);
    });
  });
});
