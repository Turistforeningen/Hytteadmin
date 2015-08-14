import DS from 'ember-data';

export default DS.Model.extend({

  beskrivelse: DS.attr('string'),
  // checksum: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  // endret: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  eier: DS.attr('object'),
  fotograf: DS.attr('object'),
  geojson: DS.attr('object'),
  grupper: DS.attr('array'),
  img: DS.attr('object'),
  lisens: DS.attr('string', {default: 'CC BY-SA 4.0'}),
  navn: DS.attr('string'),
  navngiving: DS.attr('string'),
  privat: DS.attr('object'),
  status: DS.attr('string'),
  tags: DS.attr('array'),
  // tilbyder: DS.attr('string') // TODO: Add support for readonly as this is set by NTB

});
