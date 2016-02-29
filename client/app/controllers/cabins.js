import Ember from 'ember';
import Paginated from '../mixins/paginated';

export default Ember.Controller.extend(Paginated, {
  session: Ember.inject.controller(),
  user: Ember.inject.controller('session'),

  isLoading: true,
  filterParams: {},
  searchParams: undefined,
  params: {},
  //queryParams: ['juridisk_eier', 'vedlikeholdes_av', 'navn'],
  total: Ember.computed('model', {
    get: function () {
      // NOTE: Should not be using private method like this!
      return this.store._metadataFor('cabin').total;
    }
  }),

  relation: 'vedlikeholdes_av',

  actions: {
    search: function () {
      var searchTerm = this.get('searchTerm');
      var params = searchTerm ? {navn: '~' + searchTerm} : undefined;
      this.set('searchParams', params); // Will trigger refresh with search params or filter if undefined
    }
  },

  onParamsChange: function () {
    var params = this.get('params') || {};
    this.store.unloadAll('cabin');
    this.set('isLoading', true);
    Ember.setProperties(params, {
      fields: 'navn,grupper,endret,status,privat'
    });
    this.store.query('cabin', params).then((cabins) => {
      this.set('model', cabins);
    });

  }.observes('params'),

  onPageChange: function () {
    Ember.setProperties(this.get('params'), {
      skip: this.get('limit')*this.get('page')-this.get('limit'),
      limit: this.get('limit')
    });

    this.notifyPropertyChange('params');

  }.observes('page'),

  filterParamsObject: Ember.computed('juridisk_eier', 'vedlikeholdes_av', {
    get: function () {
      let filterParamsObject = {};
      if (this.get('juridisk_eier')) {
        filterParamsObject.relation = 'juridisk_eier';
        filterParamsObject.gruppe = this.store.findRecord('group', this.get('juridisk_eier'));

      } else if (this.get('vedlikeholdes_av')) {
        filterParamsObject.relation = 'vedlikeholdes_av';
        filterParamsObject.gruppe = this.store.findRecord('group', this.get('vedlikeholdes_av'));
      }

      return filterParamsObject;
    },
    set: function (key, value) {
      if (Ember.typeOf(value.gruppe) === 'object' && Ember.typeOf(value.gruppe.id) === 'string') {
        this.set('juridisk_eier');
        this.set('vedlikeholdes_av');
        this.set(value.relation, value.gruppe.id);
        let params = {};
        params['privat.' + value.relation] = value.gruppe.id;
        this.set('params', params);
        this.resetPagination();

      } else {
        this.notifyPropertyChange('params');
      }

      return value;
    }
  }),

  onSearchParamsChange: function () {
    this.resetPagination();
    let searchParams = this.get('searchParams');
    if (searchParams) {
      this.set('params', searchParams);

    } else {
      let filterParams = this.get('filterParamsObject');
      let params = {};
      params['privat.' + filterParams.relation] = filterParams.gruppe.id;
      this.set('params', params);
    }

  }.observes('searchParams'),

  resetPagination: function () {
    this.setProperties({
      page: 1,
      offset: 0,
      limit: 20
    });
  },

  queryIsFilter: Ember.computed('params', {
    get: function () {
      var params = this.get('params');
      var queryIsFilter = (params && (params['vedlikeholdes_av'] || params['juridisk_eier'])) ? true : false;
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
