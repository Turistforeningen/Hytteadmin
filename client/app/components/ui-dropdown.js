
import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'select',
  classNames: ['ui', 'dropdown', 'fluid'],
  classNameBindings: ['search'],

  content: null,
  optionValuePath: null,
  optionLabelPath: null,

  bindAttributes: ['optionValuePath', 'optionLabelPath', 'content'],

  actions: {},

  options: function () {
    var optionLabelPath = this.get('optionLabelPath');
    var optionValuePath = this.get('optionValuePath');

    return this.get('content').map(function (item, index, list) {
      return {
        value: optionValuePath ? item.get(optionValuePath) : item,
        label: optionLabelPath ? item.get(optionLabelPath) : item
      };
    }, this);

  }.property('content.@each'),

  setup: function () {
    this.$().dropdown({
      onChange: Ember.run.bind(this, this.onChange)
    });
  }.on('didInsertElement'),

  onChange: function (value, text, $choice) {

    if (this.optionValuePath) {
      value = this.get('content').findBy(this.optionValuePath, value);
    }

    this.set('value', value);
  }

});
