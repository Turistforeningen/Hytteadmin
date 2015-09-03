import Ember from 'ember';

export default Ember.Controller.extend({
  isLoading: true,
  params: {},

  actions: {
    search: function () {
      var params = this.get('params');
      Ember.set(params, 'navn', '~' + this.get('searchTerm'));
      this.store.unloadAll('cabin');
      this.set('isLoading', true);
      this.store.query('cabin', params).then((cabins) => {
        this.set('model', cabins);
      });
    }
  },

  onModelChange: function () {
    this.set('isLoading', false);
  }.observes('model')
});
