import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'sticky'],
  attributeBindings: [],
  classNameBindings: ['position'],

  setup: function () {

    this.$().sticky({
      context: this.get('contextSelector'),
      offset: parseInt(this.get('offset'), 10)
    });

  }.on('didInsertElement')
});
