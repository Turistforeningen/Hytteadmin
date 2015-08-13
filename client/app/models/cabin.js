import DS from 'ember-data';

export default DS.Model.extend({

  HYTTETYPE_CHOICES: [
    'DNT-hytte',
    'Privat hytte',
    'Privat rabatthytte'
  ],

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

  bilder: DS.attr('array'), // TODO: belongsTo bilder
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
  sengeplasser: DS.attr('object'),
  ssr_id: DS.attr('number'),
  status: DS.attr('string', {defaultValue: 'Kladd'}),
  url: DS.attr('string'),
  tags: DS.attr('array', {defaultValue: ['Hytte']}),
  tilbyder: DS.attr('string'),
  tilrettelagt_for: DS.attr('array'),
  turkart: DS.attr('array'),

  enable_kun_bestilling_kommentar: function () {
    var kun_bestilling = this.get('privat.kun_bestilling');
    return (kun_bestilling === 'Ja' || kun_bestilling === 'Delvis');
  }.property('privat.kun_bestilling')

});
