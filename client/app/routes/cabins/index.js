import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabins',

  model: function () {
    return this.store.findAll('cabin');
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function () {
    this.render('cabins/list');
  }
});
