import DS from 'ember-data';
import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({

  normalize: function (modelClass, resourceHash, prop) {
    var normalizedHash = resourceHash;

    // Maps `fasiliteter` object to an array of objects with the key as `type` and value as `kommentar`
    if (resourceHash.fasiliteter) {
      var normalizedFasiliteter = [];
      for (var key in resourceHash.fasiliteter) {
        normalizedFasiliteter.push({type: key, kommentar: resourceHash.fasiliteter[key]});
      }
      normalizedHash.fasiliteter = normalizedFasiliteter;
    }

    return this._super(modelClass, normalizedHash, prop);
  },

  serialize: function(snapshot, options) {
    var json = this._super(snapshot, options);

    // Maps `fasiliteter` array back to object
    if (json.fasiliteter && json.fasiliteter.length) {
      var serializedFasiliteter = {};
      for (var i = 0; i < json.fasiliteter.length; i++) {
        serializedFasiliteter[json.fasiliteter[i]['type']] = json.fasiliteter[i]['kommentar'] || '';
      }
      json.fasiliteter = serializedFasiliteter;
    }

    // Update `tilrettelagt_for` with types from `tilrettelegginger`
    if (json.tilrettelegginger && json.tilrettelegginger.length) {
      json.tilrettelagt_for = json.tilrettelegginger.mapBy('type');
    }

    return json;
  }

});
