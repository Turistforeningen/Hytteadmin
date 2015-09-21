/* globals Raven */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  brukertype: DS.attr('string'),
  navn: DS.attr('string'),
  epost: DS.attr('string'),
  er_admin: DS.attr('boolean', {defaultValue: false}),
  gruppe: DS.belongsTo('group', {async: true}),
  grupper: DS.hasMany('group', {async: true}),

  primærgruppe: Ember.computed('gruppe', 'grupper.[]', {
    get: function () {
      let primærgruppe;
      let grupper = this.get('grupper') || [];

      if (grupper.length) {
        primærgruppe = grupper.findBy('type', 'sentral') || grupper.findBy('type', 'forening') || grupper.findBy('type', 'turlag') || grupper.findBy('type', 'turgruppe');

        if (primærgruppe) {
          return primærgruppe;

        } else {
          Raven.captureMessage('Could not find "primærgruppe". User with multiple groups user did not belong to group of type "sentral", "forening", "turlag" or "turgruppe".', {extra: {user: this.toJSON()}});
        }

      } else {
        let gruppe = this.get('gruppe');
        if (gruppe) {
          primærgruppe = gruppe;
        }
      }

      return primærgruppe;
    }
  })
});
