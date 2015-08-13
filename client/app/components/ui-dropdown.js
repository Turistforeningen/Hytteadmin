
import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['ui', 'selection', 'dropdown', 'fluid'],
  classNameBindings: ['multiple', 'search'],

  content: null,
  optionValuePath: null,
  optionLabelPath: null,
  allowAdditions: null,

  bindAttributes: ['optionValuePath', 'optionLabelPath', 'content', 'allowAdditions'],

  actions: {},

  options: function () {
    var optionLabelPath = this.get('optionLabelPath');
    var optionValuePath = this.get('optionValuePath');
    var content = this.get('content');

    return content ? content.map(function (item, index, list) {
      return {
        value: optionValuePath ? item.get(optionValuePath) : item,
        label: optionLabelPath ? item.get(optionLabelPath) : item
      };
    }, this) : [];

  }.property('content.@each'),

  setup: function () {
    this.$().dropdown({
      allowAdditions: this.allowAdditions,
      onChange: Ember.run.bind(this, this.onChange)
    });
  }.on('didInsertElement'),

  onChange: function (value, text, $choice) {
    if (this.optionValuePath) {
      value = this.get('content').findBy(this.optionValuePath, value);
    }

    if (this.get('multiple')) {
      var currentValue = this.get('value') || Ember.A([]);
      currentValue.pushObject(value);
      this.set('value', currentValue);

    } else {
      this.set('value', value);
    }

  }

});
