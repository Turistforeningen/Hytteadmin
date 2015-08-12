import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    var groups = this.store.findAll('group');
    this.controllerFor('groups').set('model', groups);
  }
});
