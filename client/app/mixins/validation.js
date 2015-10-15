/* globals $ */

import Ember from 'ember';

export default Ember.Mixin.create({
  _validationRules: $.fn.form.settings.rules || {},
  _validationPrompts: $.fn.form.settings.prompts || {},

  validate: function (field) {
    if (Ember.typeOf(field) === 'string') {
      this.validateField(field);

    } else {
      this._propertiesToValidate.forEach((item, index, enumerable) => {
        this.validateField(item);
      });
    }
  },

  validateField: function (field) {
    if (Ember.typeOf(field) !== 'string') {
      throw new Error('validateField called without a field argument.');
    }

    let validationRules = this[field].meta().options.validationRules;
    let validations = this.get('validations') || {};
    let fieldValidations = [];
    let isValid = true;

    validationRules.forEach((item, index, enumerable) => {
      isValid = true;
      let rule = item.type || item;

      if (Ember.typeOf(this._validationRules[rule]) === 'function') {
        isValid = this._validationRules[rule](this.get(field));

        if (isValid === false) {
          fieldValidations.addObject({rule: rule, prompt: this._validationPrompts[rule] || item.prompt || rule});
        }
      }

    });

    if (fieldValidations.get('length') > 0) {
      Ember.set(validations, field, fieldValidations);

    } else {
      delete validations.field;
    }

    this.set('validations', validations);
    this.set('isInvalid', !!Object.keys(validations).length);

  },

  onReady: Ember.on('ready', function () {
    let keys = Object.keys(this.toJSON());
    this._propertiesToValidate = [];

    keys.forEach((item, index, enumerable) => {
      let options = this[item].meta().options;
      if (Ember.typeOf(options.validationRules) === 'array') {
        this._propertiesToValidate.push(item);
      }
    });

    this._propertiesToValidate.forEach((item, index, enumerable) => {
      this.addObserver(item, function () {
        this.validate(item);
      });
    });

    if (this.get('id')) {
      this.validate();
    }
  })

});
