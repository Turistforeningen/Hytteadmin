import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition: function (transition) {
      // TODO: Validate user session here ...
      // console.log('route:application:willTransition');
      this.controllerFor('session').set('previousTransition', transition);
      this.controllerFor('session').send('validate');
    }
  },

  beforeModel: function (transition) {
    // TODO: ... and here!
    // console.log('route:application:beforeModel');
    this.controllerFor('session').set('previousTransition', transition);
    this.controllerFor('session').send('validate');
  },

  setupController: function(controller, model) {
    var groups = this.store.findAll('group');
    this.controllerFor('groups').set('model', groups);
  }
});
