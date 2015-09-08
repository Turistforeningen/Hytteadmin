import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.controller(),

  isLoading: true,
  filterParams: {},
  searchParams: undefined,
  params: {},

  actions: {
    search: function () {
      var searchTerm = this.get('searchTerm');
      var params = searchTerm ? {navn: '~' + searchTerm} : undefined;
      this.set('searchParams', params); // Will trigger refresh with search params or filter if undefined
    }
  },

  onParamsChange: function () {
    var params = this.get('params');
    this.store.unloadAll('cabin');
    this.set('isLoading', true);
    this.store.query('cabin', params).then((cabins) => {
      this.set('model', cabins);
    });

  }.observes('params'),

  onFilterParamsChange: function () {
    this.set('params', this.get('filterParams'));
  }.observes('filterParams'),

  onSearchParamsChange: function () {
    this.set('params', this.get('searchParams') || this.get('filterParams'));
  }.observes('searchParams'),

  queryIsFilter: Ember.computed('params', {
    get: function () {
      var params = this.get('params');
      var queryIsFilter = (params && (params['privat.vedlikeholdes_av'] || params['privat.juridisk_eier'])) ? true : false;
      return queryIsFilter;
    }
  }),

  queryIsSearch: Ember.computed('params', {
    get: function () {
      return !!this.get('params.navn');
    }
  }),

  onModelChange: function () {
    this.set('isLoading', false);
  }.observes('model')
});
