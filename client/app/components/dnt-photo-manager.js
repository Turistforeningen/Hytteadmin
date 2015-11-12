/* globals Sortable */
import Ember from 'ember';

export default Ember.Component.extend({

  group: 'dnt-photo-manager',
  actions: {
    categorize: function (photo, category) {
      this.sendAction('categorize', photo, category);
    }
  },

  setup: function () {
    this.sortable = Sortable.create(this.$('.grid')[0], {
      draggable: '.dnt-photo-manager-list-item',
      group: this.get('group'),
      onAdd: Ember.run.bind(this, this.onAdd),
      onEnd: Ember.run.bind(this, this.onEnd)
    });

  }.on('didInsertElement'),

  categoryPhotos: Ember.computed('photos.@each.kategori', {
    get: function () {
      let category = this.get('category');
      let photos = this.get('photos');

      return photos.filterBy('kategori', category);
    }
  }),

  onEnd: function (e) {
    const order = this.sortable.toArray();
    const photos = Ember.copy(this.get('photos').toArray()) || [];

    let reordered = photos.sort(function (a, b) {
      let aId = a.get('id');
      let bId = b.get('id');

      let aOrderIndex = order.indexOf(aId);
      let bOrderIndex = order.indexOf(bId);

      if (aOrderIndex === -1 || bOrderIndex === -1) {
        return 0;

      } else {
        return aOrderIndex - bOrderIndex;
      }

    });

    this.set('photos', reordered);
  },

  onAdd: function (e) {
    const item = e.item;
    const itemId = item.dataset.id;
    const bilde = this.get('photos').findBy('id', itemId);
    const category = this.get('category');

    bilde.set('kategori', category);
  }

});
