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
  // checksum: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  // endret: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  fasiliteter: DS.attr('object'), // object[]
  fylke: DS.attr('string'),
  geojson: DS.attr('object'),
  grupper: DS.attr('array'),
  hytte: DS.attr('object', {defaultValue: {hyttetype: ''}}),
  kart: DS.attr('string'),
  kommune: DS.attr('string'),
  lenker: DS.attr('array'), // object[]
  // lisens: DS.attr('string', {defaultValue: 'CC BY-NC 4.0'}),
  navn: DS.attr('string'),
  navn_alt: DS.attr('array'),
  navngiving: DS.attr('string'), // TODO: Should be computed by either Hytteadmin API endpoint or Hytteadmin Client
  områder: DS.attr('array'), // TODO: belongsTo områder
  privat: DS.attr('object'),
  ssr_id: DS.attr('number'),
  status: DS.attr('string', {defaultValue: 'Kladd'}),
  url: DS.attr('string'),
  tags: DS.attr('array'), // TODO: Default [0] = 'Hytte'
  tilbyder: DS.attr('string'),
  tilrettelagt_for: DS.attr('array'),
  turkart: DS.attr('array')

});
