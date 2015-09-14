import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabins',

  model: function () {
    // Will be set in CabinsController
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function () {
    this.render('cabins/list');

    this.render('cabins/header-left', {
      into: 'application',
      outlet: 'header-left'
    });
  }
});
