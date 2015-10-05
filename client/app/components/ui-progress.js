import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'progress'],
  classNameBindings: ['color'],

	attributeBindings: ['style'],

  color: null,
  percent: null,
  value: null,
  total: null,

  update: function () {
    let percent = this.get('percent');
    if (Ember.typeOf(percent) === 'number') {
      this.$().progress({percent: percent});
    }

  }.observes('percent')

});
