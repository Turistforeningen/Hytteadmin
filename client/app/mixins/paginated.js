import Ember from 'ember';

export default Ember.Mixin.create({
  //queryParams: ['page'],
  page: 1,
  offset: 0,
  limit: 20,


  pages: Ember.computed('totalPages', {
    get: function () {
      let pages = [];
      let totalPages = this.get('totalPages');

      for (let i = 1; i <= totalPages ; i++) {
        let page = {number: i};
        if (i === this.get('page')) {
          page.isCurrent = true;
        }
        pages.push(page);
      }

      return pages;
    }
  }),

  hasPreviousPage: function() {
    return this.get('page') > 1;
  }.property('page'),

  hasNextPage: function() {
    return (this.get('offset') + this.get('limit')) < this.get('total');
  }.property('offset', 'limit', 'total'),

  totalPages: Ember.computed('total', {
    get: function () {
      var totalPages = Math.ceil(this.get('total')/this.get('limit'));
      return totalPages;
    }
  }),

  actions:{
    previousPage: function () {
      this.decrementProperty('page');
    },

    nextPage: function () {
      this.incrementProperty('page');
    },

    goToPage: function (page) {
      if (Ember.typeOf(page) === 'number') {
        this.set('page', page);
      }
    }
  }
});
