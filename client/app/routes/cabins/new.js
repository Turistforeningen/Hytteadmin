import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabin',

  model: function (params) {
    return this.store.createRecord('cabin', {grupper: [this.controllerFor('session').get('model.primærgruppe.id')]});
  },

  afterModel: function (cabin, transition) {
    document.title = `Ny hytte – ${document.title}`;
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function () {
    this.render('cabins/edit');

    this.render('cabins/header-right', {
      into: 'application',
      outlet: 'header-right'
    });
  }
});
