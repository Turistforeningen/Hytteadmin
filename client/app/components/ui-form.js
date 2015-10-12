import Ember from 'ember';

export default Ember.Component.extend({
  element: 'form',
  classNames: ['ui form'],

  isSaving: null,
  isValid: null,
  invalidFields: null,
  validationRules: null,

  initialize: function () {
    this.set('isSaving', false);
    this.set('isValid', true);
    this.set('invalidFields', []);
    this.set('validationRules', this.get('validationRules') || []);

  }.on('willInsertElement'),

  invalidFieldsChanged: function () {
    this.set('isValid', !this.get('invalidFields.length'));
  }.observes('invalidFields', 'invalidFields.[]'),

  setup: function () {
    let validationRules = this.get('validationRules') || [];
    let validationRulesObject = {};

    validationRules.forEach((item, index, enumerable) => {
      if (Ember.typeOf(item.identifier === 'string')) {
        validationRulesObject[item.identifier] = item;
      }
    });

    if (validationRules) {
      var me = this;
      this.$().form({
        fields: validationRulesObject,
        inline: true,
        on: 'blur',
        onValid: function () {
          me.get('invalidFields').removeObject($(this).data('validate'));
        },
        onInvalid: function () {
          me.get('invalidFields').pushObject($(this).data('validate'));
          me.set('isValid', false);
        },
        onSuccess: function (event, fields) {
          me.set('invalidFields', []);
        },
        onFailure: function (formErrors, fields) {
          me.set('isValid', false);
        }
      });
    }

    if (this.get('validateImmidiately')) {
      this.validateForm();
    }

  }.on('didInsertElement').observes('validationRules.[]'),

  onIsSavingChange: function () {
    if (this.get('isSaving')) {
      this.validateForm();
    }
  }.observes('isSaving'),

  validateForm: function () {
    this.$().form('validate form');
  }

});
