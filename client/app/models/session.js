import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  brukertype: DS.attr('string'),
  navn: DS.attr('string'),
  epost: DS.attr('string'),
  er_admin: DS.attr('boolean', {defaultValue: false}),
  gruppe: DS.belongsTo('group', {async: true}),
  grupper: DS.hasMany('group', {async: true}),

  er_sherpabruker: Ember.computed('brukertype', {
    get: function () {
      return this.get('brukertype') === 'DNT';
    }
  }),

  primærgruppe: Ember.computed('gruppe', 'grupper.[]', {
    get: function () {
      let primærgruppe;
      let grupper = this.get('grupper') || [];

      // DNT Connect users
      if (grupper.get('length')) {
        primærgruppe = grupper.findBy('type', 'sentral') || grupper.findBy('type', 'forening') || grupper.findBy('type', 'turlag') || grupper.findBy('type', 'turgruppe') || grupper.get('firstObject');

        if (primærgruppe) {
          return primærgruppe;

        } else {
          this.get('logger').captureMessage('Could not find "primærgruppe". User with multiple groups user did not belong to group of type "sentral", "forening", "turlag" or "turgruppe".', {
            extra: {user: this.toJSON()}
          });
        }

      } else {
        // Turbasen users
        // NOTE: Not sure why content property has to be get here
        let gruppe = this.get('gruppe.content');
        if (gruppe) {
          primærgruppe = gruppe;
        }
      }

      return primærgruppe;
    }
  })
});
