import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition: function (transition) {
      // TODO: ... and here!
      // console.log('route:application:willTransition');
      var session = this.store.findAll('session').then(function (sessions) {
        console.log('sessions', sessions);

      }).catch((err) => {
        console.error(err);
        this.transitionTo('session.login');
      });
    }
  },

  beforeModel: function (transition) {
    // TODO: Validate user session here ...
    // console.log('route:application:beforeModel');
  },

  setupController: function(controller, model) {
    var groups = this.store.findAll('group');
    this.controllerFor('groups').set('model', groups);
  }
});
