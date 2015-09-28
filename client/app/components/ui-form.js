import Ember from 'ember';

export default Ember.Component.extend({
  element: 'form',
  classNames: ['ui form'],

  isSaving: null,
  validationRules: null,

  setup: function () {
    let validationRules = this.get('validationRules');
    let validationRulesObject = {};

    validationRules.forEach((item, index, enumerable) => {
      if (Ember.typeOf(item.identifier === 'string')) {
        validationRulesObject[item.identifier] = item;
      }
    });

    if (validationRules) {
      this.$().form({
        fields: validationRulesObject,
        inline: true,
        on: 'blur'
      });
    }
  }.on('didInsertElement').observes('validationRules.[]'),

  validateForm: function () {
    if (this.get('isSaving')) {
      this.$().form('validate form');
    }
  }.observes('isSaving')
});
