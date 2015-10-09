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
  allowAdditions: false,
  dropdown: true,

  bindAttributes: ['value', 'content', 'allowAdditions', 'action', 'data-validate'],

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

    //var value = this.optionValuePath ? this.get('value.' + this.optionValuePath) : this.get('value');

    this.$().dropdown({
      allowAdditions: this.allowAdditions,
      // onHide: Ember.run.bind(this, this.onHide),
      onChange: Ember.run.bind(this, this.onChange),
      onAdd: Ember.run.bind(this, this.onAdd),
      onRemove: Ember.run.bind(this, this.onRemove)
   }).dropdown('set selected', this.value);

  }.on('didInsertElement'),

  onAdd: function (addedValue, addedText, $addedChoice) {
    this.set('adding', true); // To let onChange know we are adding, and handling the change here
    let value = this.get('value');
    if (!value) {
      value = [addedValue];

    } else if (value.indexOf(addedValue) > -1) {
      return;

    } else {
      value.addObject(addedValue);
    }

    this.set('value', value);
  },

  onRemove: function (removedValue, removedText, $removedChoice) {
    this.set('removing', true); // To let onChange know we are removing, and handling the change here
    let value = this.get('value');
    if (value && value.indexOf(removedValue) === -1) {
      return;

    } else {
      value.removeObject(removedValue);
    }

    this.set('value', value);
  },

  onValueChange: function () {
    // If optionValuePath has value, use that to get dropdown value
    let value;

    if (['instance', 'object'].indexOf(Ember.typeOf(this.get('value'))) > -1) {
      value = this.get('value.' + this.optionValuePath);

    } else {
      value = this.get('value');
    }

    this.$().dropdown('set selected', value);

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
    if (this.get('adding') || this.get('removing')) {
      this.setProperties({adding: false, removing: false});
      return;
    }

    if (Ember.isEmpty($choice)) {
      // Change was not triggered by user selecting a choice
      return;
    }

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
      if (this.get('value') === value) {
        return; // No need to set value if it is already the same
      }

      if (this.optionValuePath) {
        value = this.get('content').findBy(this.optionValuePath, value);

        if (['instance', 'object'].indexOf(Ember.typeOf(this.get('value'))) === -1) {
          // Only want to set the valuePath value if related value is not an object or instance of object
          value = value.get(this.get('optionValuePath'));
        }
      }

      if (this.get('multiple')) {
       value = value ? Ember.A(value.split(',')) : undefined;
      }

      this.set('value', value);
    }

  }

});
