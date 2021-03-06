import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabin',

  model: function (params) {
    return this.store.findRecord('cabin', params.id, {reload: true});
  },

  afterModel: function (cabin, transition) {
    const cabinNavn = cabin.get('navn') || 'Hytte uten navn';
    document.title = `${cabinNavn} – ${document.title}`;
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
  },

  actions: {
    save: function () {
      this.controller.send('save');
    },

    removePhoto: function (photo) {
      this.controller.send('removePhoto', photo);
    }
  }
});
