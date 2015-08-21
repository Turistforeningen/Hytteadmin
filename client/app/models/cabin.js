import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  BETJENINGSGRAD_CHOICES: [
    'Betjent',
    'Servering',
    'Selvbetjent',
    'Ubetjent',
    'Dagshytte',
    'Nødbu',
    'Utleie',
    'Stengt',
    'Nedlagt'
  ],

  FASILITETER_CHOICES: [
    '12v',
    '220v',
    'Badstu',
    'Båt',
    'Dusj',
    'Kano',
    'Kortbetaling',
    'Mobildekning',
    'Peis',
    'Servering',
    'Steikeovn',
    'Strømovn',
    'Sykkel',
    'Sykkelutleie',
    'Telefon',
    'Teltplass',
    'Tørkerom',
    'Utleie',
    'Vann',
    'Vedovn',
    'Wc'
  ],

  HYTTETYPE_CHOICES: [
    'DNT-hytte',
    'Privat hytte',
    'Privat rabatthytte'
  ],

  TILRETTELAGT_FOR_CHOICES: [
    'Barnevogn',
    'Rullestol',
    'Hund',
    'Skoleklasser',
    'Handikap'
  ],

  bilder: DS.hasMany('photo', {async: true}),
  beskrivelse: DS.attr('string'),
  betjeningsgrad: DS.attr('string'),
  byggeår: DS.attr('number'),
  description: DS.attr('string'),
  // checksum: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  // endret: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  fasiliteter: DS.attr('object'), // object[]
  fylke: DS.attr('string'),
  geojson: DS.attr('object'),
  grupper: DS.attr('array'),
  hyttetype: DS.attr('string'),
  kart: DS.attr('string'),
  kommune: DS.attr('string'),
  kontaktinfo: DS.attr('array', {defaultValue: [{'tittel': 'I sesong'}, {'tittel': 'Utenom sesong'}]}),
  lenker: DS.attr('array'), // object[]
  // lisens: DS.attr('string', {defaultValue: 'CC BY-NC 4.0'}),
  navn: DS.attr('string'),
  navn_alt: DS.attr('array'),
  navngiving: DS.attr('string'), // TODO: Should be computed by either Hytteadmin API endpoint or Hytteadmin Client
  områder: DS.hasMany('area', {async: true}),
  privat: DS.attr('object'),
  juridisk_eier: DS.belongsTo('group', {async: true}),
  vedlikeholdes_av: DS.belongsTo('group', {async: true}),
  ssr_id: DS.attr('number'),
  status: DS.attr('string', {defaultValue: 'Kladd'}),
  url: DS.attr('string'),
  tilkomst: DS.attr('object', {defaultValue: {
    'privat': {'sommer': undefined, 'vinter': undefined},
    'kollektiv': {'sommer': undefined, 'vinter': undefined}
  }}),
  tags: DS.attr('array', {defaultValue: ['Hytte']}),
  // tilbyder: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  tilrettelagt_for: DS.attr('array'),
  turkart: DS.attr('array'),

  updateVedlikeholdesAv: function () {
    var vedlikeholdesAvId = this.get('privat.vedlikeholdes_av');
    if (vedlikeholdesAvId) {
      this.store.find('group', vedlikeholdesAvId).then(Ember.run.bind(this, function (group) {
        this.set('vedlikeholdes_av', group);
      }));
    }

  }.observes('privat.vedlikeholdes_av'),

  updateJuridiskEier: function () {
    var updateJuridiskEierId = this.get('privat.juridisk_eier');
    if (updateJuridiskEierId) {
      this.store.find('group', updateJuridiskEierId).then(Ember.run.bind(this, function (group) {
        this.set('juridisk_eier', group);
      }));
    }

  }.observes('privat.juridisk_eier'),

  enable_kun_bestilling_kommentar: function () {
    var kun_bestilling = this.get('privat.kun_bestilling');
    return (kun_bestilling === 'Ja' || kun_bestilling === 'Delvis');
  }.property('privat.kun_bestilling'),

  kontaktinfo_i_sesong: Ember.computed('kontaktinfo.[]', {
    get: function() {
      return this.get('kontaktinfo').findBy('type', 'I sesong');
    }
  }),

  kontaktinfo_utenom_sesong: Ember.computed('kontaktinfo.[]', {
    get: function() {
      return this.get('kontaktinfo').findBy('type', 'Utenom sesong');
    }
  }),

  latitude: Ember.computed('geojson.coordinates.1', {
    get: function() {
      return this.get('geojson.coordinates.1');
    },
    set: function(key, value) {
      this.set('geojson.coordinates.1', parseFloat(value, 10));
      return value;
    }
  }),

  longitude: Ember.computed('geojson.coordinates.0', {
    get: function() {
      return this.get('geojson.coordinates.0');
    },
    set: function(key, value) {
      this.set('geojson.coordinates.0', parseFloat(value, 10));
      return value;
    }
  })

});
