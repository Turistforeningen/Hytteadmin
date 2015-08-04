import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save: function () {
      var model = this.get('model');
      model.save();
    }
  }
});
