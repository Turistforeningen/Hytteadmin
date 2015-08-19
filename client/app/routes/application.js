import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    var groups = this.store.findAll('group');
    this.controllerFor('groups').set('model', groups);

    var users = this.store.findAll('user').then(function (users) {
      console.log('users', users);

    }).catch(function (err) {
      if (err.authenticated === false) {
        // TODO: Redirect to login
      }

    });

  }
});
