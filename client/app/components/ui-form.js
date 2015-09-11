import Ember from 'ember';

export default Ember.Component.extend({
  element: 'form',
  classNames: ['ui form'],

  attributeBindings: ['validationRules'],
  validationRules: null,

  setup: function () {
    let validationRules = this.get('validationRules');

    if (validationRules) {
      this.$().form({
        fields: validationRules,
        inline: true,
        on: 'blur'
      });
    }
  }.on('didInsertElement')

});
