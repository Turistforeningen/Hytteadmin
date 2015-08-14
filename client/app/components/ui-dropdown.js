
import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['ui', 'selection', 'dropdown', 'fluid'],
  classNameBindings: ['multiple', 'search'],

  content: null,
  value: null,
  optionValuePath: null,
  optionLabelPath: null,
  allowAdditions: null,

  bindAttributes: ['optionValuePath', 'optionLabelPath', 'value', 'content', 'allowAdditions'],

  actions: {},

  options: function () {
    var optionLabelPath = this.get('optionLabelPath');
    var optionValuePath = this.get('optionValuePath');
    var selectContent = this.get('content');

    return selectContent ? selectContent.map(function (item, index, list) {
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
    }).dropdown('set selected', this.get('value'));
  }.on('didInsertElement'),

  onChange: function (value, text, $choice) {
    if (this.optionValuePath) {
      value = this.get('content').findBy(this.optionValuePath, value);
    }

    if (this.get('multiple')) {
     value = value ? Ember.A(value.split(',')) : undefined;
    }

    this.set('value', value);

  }

});
