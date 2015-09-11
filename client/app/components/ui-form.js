import Ember from 'ember';

export default Ember.Component.extend({
  element: 'form',
  classNames: ['ui form'],

  isSaving: null,
  validationRules: null,
  attributeBindings: ['isSaving', 'validationRules'],

  setup: function () {
    let validationRules = this.get('validationRules');

    if (validationRules) {
      this.$().form({
        fields: validationRules,
        inline: true,
        on: 'blur'
      });
    }
  }.on('didInsertElement'),

  validateForm: function () {
    if (this.get('isSaving')) {
      this.$().form('validate form');
    }
  }.observes('isSaving')
});
