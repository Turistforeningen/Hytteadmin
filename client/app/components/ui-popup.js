import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'popup', 'hidden'],

  setup: function () {
    let triggerEl = this.$().prev();
    let popupEl = this.$();

    if (triggerEl.is('button') || triggerEl.is('a') || triggerEl.hasClass('ui button')) {
      triggerEl.popup({
        inline: true,
        popup: popupEl,
        on: 'click'
      });
    }

  }.on('didInsertElement')

});
