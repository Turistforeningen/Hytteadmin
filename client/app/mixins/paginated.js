import Ember from 'ember';

export default Ember.Mixin.create({
  //queryParams: ['page'],
  page: 1,
  offset: 0,
  limit: 20,


  pages: Ember.computed('totalPages', 'page', {
    get: function () {
      const totalPages = this.get('totalPages');
      const maxPages = 5;
      const currentPage = this.get('page');
      const buttonRange = [];
      const first = (currentPage - (maxPages/2) < 1) ? 1 : Math.ceil(currentPage - (maxPages/2));
      const last = currentPage < Math.ceil(maxPages/2) ? maxPages : (currentPage + (maxPages/2) > totalPages) ? totalPages : Math.floor(currentPage + (maxPages/2));

      for (let i = first; i <= last; i++) {
        buttonRange.push(i);
      }

      const pages = [];
      const prevTruncated = [];
      const nextTruncated = [];

      for (let i = 1; i <= totalPages ; i++) {
        let page = {number: i};

        if (i < first) {
          prevTruncated.push(page);

        } else if (i > last) {
          nextTruncated.push(page);

        } else {
          if (i === currentPage) {
            page.isCurrent = true;
          }
          pages.push(page);
        }
      }

      if (prevTruncated.length) {
        pages.unshift(prevTruncated);
      }

      if (nextTruncated.length) {
        pages.push(nextTruncated);
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
