import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'photo',

  actions: {
    goBack: function () {
      // NOTE: Replace transitionTo with replaceWith to pop image edit route from history
      this.transitionTo('cabins.edit', this.controllerFor('cabin').get('model'));
    }
  },

  model: function (params) {
    return this.store.findRecord('photo', params.photo_id, {reload: false});
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function () {
    this.render('cabins/edit/photos/edit', {
      into: 'cabins/edit',
      outlet: 'photos-edit'
    });
  }

});
