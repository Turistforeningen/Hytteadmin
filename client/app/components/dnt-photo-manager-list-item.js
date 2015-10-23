import Ember from 'ember';

export default Ember.Component.extend({
  photo: null,

  classNames: ['dnt-photo-manager-list-item', 'column'],
  attributeBindings: ['photo.id:data-id'],

  actions: {
    save: function () {
      this.get('photo').save();
    },

    deletePhoto: function (photo) {
      photo = photo || this.get('photo');
      this.sendAction('removePhoto', photo, false);
    },

    toggleDeleteMode: function () {
      this.set('deleteMode', !this.get('deleteMode'));
    },

    categorize: function (category) {
      const tags = this.get('photo.tags') || [];
      tags.addObject(category);
      this.set('photo.tags', tags);
    }
  }

});
