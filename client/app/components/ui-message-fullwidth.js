import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'inverted', 'menu'],
  classNameBindings: ['color'],

  color: 'grey', // NOTE: Suggest renaming to computer/US english `gray`
  attributeBindings: ['color'],

  prepare: function () {
    this.$().css({
      'border-radius': 0,
      'margin': 0,
      'padding': '1rem 0'
    });

  }.on('willInsertElement'),
});
