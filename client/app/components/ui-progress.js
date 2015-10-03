import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'progress'],
  classNameBindings: ['color'],

  color: null,
  percent: null,
  value: null,
  total: null,

  setup: function () {
    console.log('Setup progress bar.');
  }.on('didInsertElement'),

  update: function () {
    let percent = this.get('percent');
    if (Ember.typeOf(percent) === 'number') {
      this.$().progress({percent: percent});
    }

  }.observes('percent')

});
