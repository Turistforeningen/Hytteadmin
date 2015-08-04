import Ember from 'ember';

export default Ember.Component.extend({
  setup: function (e) {
    this.$('.tabular.menu .item').tab();
  }.on('didInsertElement')
});
