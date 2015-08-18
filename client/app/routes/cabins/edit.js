import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabin',

  model: function (params) {
    return this.store.findRecord('cabin', params.id, {reload: true});
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function () {
    this.render('cabins/edit');

    this.render('cabins/toolbar', {
      into: 'application',
      outlet: 'toolbar'
    });
  }
});
