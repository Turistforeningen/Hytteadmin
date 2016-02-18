/* globals Sortable */
import Ember from 'ember';

export default Ember.Component.extend({
  group: 'dnt-photo-manager',

  actions: {
    categorize: function (photo, category) {
      this.sendAction('categorize', photo, category);
    },

    removePhoto: function (photo, destroy) {
      this.sendAction('removePhoto', photo, destroy);
    }
  },

  setup: function () {
    this.sortable = Sortable.create(this.$('.grid')[0], {
      draggable: '.dnt-photo-manager-list-item',
      group: this.get('group'),
      onAdd: Ember.run.bind(this, this.onAdd),
      onUpdate: Ember.run.bind(this, this.onSortableUpdate)
    });

  }.on('didInsertElement'),

  categoryPhotos: Ember.computed('photos.@each.kategori', {
    get: function () {
      let category = this.get('category');
      let photos = this.get('photos');

      return photos.filterBy('kategori', category);
    }
  }),

  reorderBySortable: function () {
    const order = this.sortable.toArray();
    const photos = Ember.copy(this.get('photos').toArray()).map(function (item, index) {
      item.set('index', index); // Add original index to use in custom sort function
      // http://stackoverflow.com/questions/3195941/sorting-an-array-of-objects-in-chrome
      return item;
    }) || [];

    const reordered = photos.sort(function (a, b) {
      let aOrderIndex = order.indexOf(a.get('id'));
      let bOrderIndex = order.indexOf(b.get('id'));

      if (aOrderIndex === -1 || bOrderIndex === -1) {
        return a.get('index') > b.get('index') ? 1 : -1;

      } else {
        return aOrderIndex > bOrderIndex ? 1 : -1;
      }
    });

    this.set('photos', reordered);
  },

  onSortableUpdate: function (e) {
    this.reorderBySortable();
  },

  onAdd: function (e) {
    const photos = Ember.copy(this.get('photos').toArray());
    const photoId = e.item.dataset.id;
    const photo = photos.findBy('id', photoId);
    const category = this.get('category');
    const order = this.sortable.toArray();

    if (order.length > 1) {
      // Photo is dropped in category with other photos, need to position relative to prev or next
      const indexInOrder = order.indexOf(photoId);

      // Remove photo that will be inserted at new index, to prevent it from affecting indexes
      photos.removeObject(photo);

      if (indexInOrder > 0) {
        // Is dropped after a photo
        const prevPhoto = photos.findBy('id', order[indexInOrder - 1]);
        const prevPhotoIndex = photos.indexOf(prevPhoto);
        photos.insertAt(prevPhotoIndex + 1, photo);

      } else {
        // Is dropped first in set, put before the photo that was first in set
        const nextPhoto = photos.findBy('id', order[indexInOrder + 1]);
        const nextPhotoIndex = photos.indexOf(nextPhoto);
        photos.insertAt(nextPhotoIndex, photo);
      }

      photo.set('kategori', category);
      this.set('photos', photos);

    } else {
      // If there are no other photos in the category, the categorize action will have to be used, as there
      // is no way to know where in the photos set to put it
      this.send('categorize', photo, category);
    }
  }

});
