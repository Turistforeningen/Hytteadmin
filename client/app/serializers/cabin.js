import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  // NOTE: Depends on DS.EmbeddedRecordsMixin
  attrs: {
    juridisk_eier: {serialize: false},
    vedlikeholdes_av: {serialize: false}
  },

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

    if (resourceHash.tilrettelagt_for && resourceHash.tilrettelagt_for.length) {
      let tilrettelegginger = resourceHash.tilrettelegginger || [];
      for (let i = 0; i < resourceHash.tilrettelagt_for.length; i++) {
        if (typeof tilrettelegginger.findBy('type', resourceHash.tilrettelagt_for[i]) === 'undefined') {
          tilrettelegginger.addObject({'type': resourceHash.tilrettelagt_for[i]});
        }
      }
      normalizedHash.tilrettelegginger = tilrettelegginger;
    }

    if (resourceHash.turkart && resourceHash.turkart.length) {
      resourceHash.turkart = resourceHash.turkart.map((item, index, enumerable) => {
        return {navn: item};
      });
    }

    return this._super(modelClass, normalizedHash, prop);
  },

  serialize: function(snapshot, options) {
    var json = this._super(snapshot, options);
    json.privat = json.privat || {};

    // Maps kontaktinfo to privat for UT suppor
    json.privat.kontaktinfo = json.privat.kontaktinfo || {};
    const kontaktinfo = Ember.A(Ember.copy(Ember.get(json, 'kontaktinfo')));
    const kontaktinfoISesong = kontaktinfo.findBy('type', 'I sesong');
    const kontaktinfoUtenomSesong = kontaktinfo.findBy('type', 'Utenom sesong');

    Ember.set(json, 'privat.kontaktinfo.sesong', kontaktinfoISesong);
    Ember.set(json, 'privat.kontaktinfo.utenom_sesong', kontaktinfoUtenomSesong);

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

    if (json.turkart && json.turkart.length) {
      json.turkart = json.turkart.mapBy('navn');
      json.turkart.removeObjects([null, undefined]);
    }

    return json;
  }

});
