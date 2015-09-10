import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'fixed', 'top', 'sticky'],
  classNameBindings: [],

  offset: 0,
  attributeBindings: ['offset'],

  prepare: function () {
    let offset = 0;
    let fixedTopElements = Ember.A(window.$('.fixed.top'));

    for (let i = 0; i < fixedTopElements.length; i++) {
      let el = fixedTopElements[i];
      let elHeight = el.offsetHeight;
      offset += elHeight;
    }

    this.set('offset', offset);
    this.$().css({left: 0, right: 0});

  }.on('willInsertElement'),

  onOffsetChange: function () {
    this.$().css('top', this.get('offset'));

  }.observes('offset')

});
