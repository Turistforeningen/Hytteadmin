/* globals Sortable */
import Ember from 'ember';

export default Ember.Component.extend({
  sortableLists: [],

  setup: function () {
    let sortableLists = [
      this.$('.selection.list[data-category=""]')[0],
      this.$('.selection.list[data-category="sommer"]')[0],
      this.$('.selection.list[data-category="vinter"]')[0]
    ];

    sortableLists.forEach((item, index, enumerable) => {
      let sortable = Sortable.create(item, {
        draggable: '.item',
        group: 'photos',
        onAdd: Ember.run.bind(this, this.onAdd),
        onEnd: Ember.run.bind(this, this.onEnd)
      });

      this.sortableLists.addObject(sortable);
    });

  }.on('didInsertElement'),

  onEnd: function (e) {
    let mergedLists = [];

    this.sortableLists.forEach((item, index, enumerable) => {
      mergedLists.addObjects(item.toArray());
    });

    this.set('photosOrder', mergedLists);

    let reordered = this.get('bilder').toArray().sort(function (a, b) {
      return mergedLists.indexOf(a.get('id')) > mergedLists.indexOf(b.get('id'));
    });

    this.set('bilder', reordered);
  },

  onAdd: function (e) {
    let item = e.item;
    let itemId = item.dataset.id;
    let bilde = this.get('bilder').findBy('id', itemId);
    let category = e.to.dataset.category;

    this.categorize(bilde, category);
  },

  categorize: function (photo, category) {
    let tags = photo.get('tags') || [];
    tags.removeObjects(['sommer', 'vinter']);

    if (category) {
      tags.addObject(category);
    }
    photo.set('tags', tags);
  },

  ukategoriserte: Ember.computed('bilder.@each.tags', 'bilder.@each.tags[]', {
    get: function () {
      return this.get('bilder').filter(function (item, index, enumerable) {
        return item.get('er_sommerbilde') === false && item.get('er_vinterbilde') === false;
      });
    }
  }),

  sommerbilder: Ember.computed('bilder.@each.tags', 'bilder.@each.tags[]', {
    get: function () {
      return this.get('bilder').filterBy('er_sommerbilde', true);
    }
  }),

  har_sommerbilder: Ember.computed('sommerbilder.[]', {
    get: function () {
      return this.get('sommerbilder').length > 0;
    }
  }),

  vinterbilder: Ember.computed('bilder.@each.tags', 'bilder.@each.tags[]', {
    get: function () {
      return this.get('bilder').filterBy('er_vinterbilde', true);
    }
  }),

  har_vinterbilder: Ember.computed('vinterbilder.[]', {
    get: function () {
      return this.get('vinterbilder').length > 0;
    }
  })

});
