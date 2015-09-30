import Ember from 'ember';

export default Ember.Component.extend({
  photo: null,

  classNames: ['item'],
  attributeBindings: ['photo.id:data-id'],

  actions: {
    save: function () {
      this.get('photo').save();
    }
  }
});
