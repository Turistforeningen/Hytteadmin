import Ember from 'ember';
import DS from 'ember-data';

// TODO: Consider separate Group models for groups from Sherpa and Turbasen
export default DS.Model.extend({
  // checksum: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  // endret: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  foreldregruppe: DS.attr('string'), // DS.belongsTo('group', {async: true}),
  grupper: DS.attr('array'), // DS.hasMany('group', {async: true}),
  kontaktinfo: DS.attr('array', {defaultValue: [{'type': 'Primærkontakt'}]}),
  kontaktinfo_primærkontakt: Ember.computed('kontaktinfo.[]', 'kontaktinfo.@each.type', {
    get: function () {
      var kontaktinfo = this.get('kontaktinfo');
      if (kontaktinfo) {
        return this.get('kontaktinfo').findBy('type', 'Primærkontakt');
      }
    }
  }),
  lisens: DS.attr('string', {defaultValue: 'CC BY-SA 4.0'}),
  logo: DS.attr('string'),
  navn: DS.attr('string'),
  navngiving: DS.attr('string'),
  privat: DS.attr('object'),
  status: DS.attr('string'),
  tags: DS.attr('array'),
  type: DS.attr('string'), // Sherpa group property
  tilbyder: DS.attr('string'),
  url: DS.attr('string')
});
