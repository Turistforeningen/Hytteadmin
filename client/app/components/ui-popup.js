import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'popup', 'hidden'],

  inverted: false, // true, false
  on: 'click', // focus, click, hover, or manual
  position: 'top center', // [top|bottom] [left|center|right], left center, right center
  attributeBindings: ['inverted', 'on', 'position'],

  setup: function () {
    let triggerEl = this.$().prev();
    let popupEl = this.$();

    triggerEl.popup({
      inline: true,
      popup: popupEl,
      inverted: this.get('inverted'),
      on: this.get('on'),
      position: this.get('position')
    });

  }.on('didInsertElement')

});
