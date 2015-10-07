import Ember from 'ember';

export default Ember.Component.extend({
  photo: null,

  classNames: ['dnt-photo-manager-list-item', 'item'],
  attributeBindings: ['photo.id:data-id'],

  actions: {
    save: function () {
      this.get('photo').save();
    }
  }
});
