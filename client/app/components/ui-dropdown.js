import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['ui', 'dropdown'],
  classNameBindings: ['multiple', 'search', 'inline', 'selection', 'fluid'],

  selection: true,
  fluid: true,

  content: null,
  value: null,
  optionValuePath: null,
  optionLabelPath: null,
  allowAdditions: null,

  bindAttributes: ['optionValuePath', 'optionLabelPath', 'value', 'content', 'allowAdditions', 'action', 'data-validate'],

  actions: {},

  options: function () {
    var optionLabelPath = this.get('optionLabelPath');
    var optionValuePath = this.get('optionValuePath');
    var selectContent = this.get('content');

    return selectContent ? selectContent.map(function (item, index, list) {
      // NOTE: Breaks if optionValuePath or optionLabelPath is specified but item does not have a get-method
      // TODO: Consider adding support for plain object items
      return {
        value: optionValuePath ? item.get(optionValuePath) : item,
        label: optionLabelPath ? item.get(optionLabelPath) : item
      };
    }, this) : [];

  }.property('content.[]'),

  setup: function () {
    if (this.get('inline')) {
      // DEPRECATION: You should never change properties on components, services or models during didInsertElement because it causes significant performance degradation.
      this.set('selection', false);
      this.set('fluid', false);
    }

    this.$().dropdown({
      allowAdditions: this.allowAdditions,
      // onHide: Ember.run.bind(this, this.onHide),
      onChange: Ember.run.bind(this, this.onChange)
   }).dropdown('set selected', this.value);

  }.on('didInsertElement'),

  onValueChange: function () {
    // TODO: Handle dropdowns with multiple
    // console.log('onValueChange', this.get('value'));

    // If optionValuePath has value, use that to get dropdown value
    var value = this.optionValuePath ? this.get('value.' + this.optionValuePath) : this.get('value');

    this.$().dropdown('set selected', value);

    // if (typeof this.value === 'undefined') {
    //   return;
    // }

    // this.$().dropdown('set selected', Ember.A(this.value.map(function (item, index, list) {
    //   return item.replace(',', '');
    // })));

  }.observes('value'),

  onHide: function () {
    // Need to trigger blur manually to perform validation on blur
    let input = this.$('input');
    if (input.val() === '') {
      // No value was selected
      input.trigger('blur');
    }
  },

  onChange: function (value, text, $choice) {

    // TODO: Need to check wether change is triggered by method above and if that's the case; ignore the change

    // NOTE: This will have to be improved, can not assume ignoring value === undefined is okay
    // if ((this.value && this.value.toString() === value) || (this.value === undefined)) {
    //   return;
    // }

    if (this.get('attrs.action')) {

      if (!this.get('attrs.value')) {
        this.$().dropdown('clear');
      }

      this.sendAction('action', value);

    } else {
      if (this.optionValuePath) {
        value = this.get('content').findBy(this.optionValuePath, value);
      }

      if (this.get('multiple')) {
       value = value ? Ember.A(value.split(',')) : undefined;
      }

      this.set('value', value);
    }

  }

});
