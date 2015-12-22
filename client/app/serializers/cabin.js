import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from '../serializers/application';
import moment from 'moment';

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

    // Add `privat.juridisk_eier` and `privat.vedlikeholdes_av` to `grupper`, for use in access control
    // TODO: Consider if `grupper` should be emptied before adding these fields, to remove them if removed as owner or maintainer
    json.grupper = json.grupper || Ember.A();
    json.grupper.addObjects([Ember.get(json, 'privat.juridisk_eier'), Ember.get(json, 'privat.vedlikeholdes_av')]);
    json.grupper.removeObject(undefined);

    if (json.privat && json.privat.åpningstider && Ember.typeOf(json.privat.åpningstider) === 'array') {
      const åpningstider = json.privat.åpningstider;
      for (let i = 0; i < åpningstider.length; i++) {
        let åpningstid = åpningstider[i];

        if (åpningstid.fra) {
          åpningstid.fra = moment(åpningstid.fra).format('YYYY-MM-DD');
        }

        if (åpningstid.til) {
          åpningstid.til = moment(åpningstid.til).format('YYYY-MM-DD');
        }

        åpningstider[i] = åpningstid;
      }
    }

    return json;
  }

});
