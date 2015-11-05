import Ember from 'ember';

export default Ember.Route.extend({
  moment: Ember.inject.service(),
  actions: {
    willTransition: function (transition) {
      // TODO: Validate user session here ...
      // console.log('route:application:willTransition');
      this.controllerFor('session').set('previousTransition', transition);
      this.controllerFor('session').send('validate');
    }
  },

  beforeModel: function (transition) {
    this.get('moment').changeLocale('nb');
    // TODO: ... and here!
    // console.log('route:application:beforeModel');
    this.controllerFor('session').set('previousTransition', transition);
    this.controllerFor('session').send('validate');
  }
});
