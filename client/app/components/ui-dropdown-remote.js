import Ember from 'ember';

// TODO: Should extend ui-dropdown instead, to inherit properties and methods
export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['ui', 'search', 'selection', 'dropdown'],
  classNameBindings: ['fluid'],
  fluid: true,

  allowClear: true,
  text: null,
  value: null,
  bindAttributes: ['allowClear', 'text', 'value'],

  actions: {
    clearValue: function () {
      this.set('value', undefined);
      this.$().dropdown('clear');
    }
  },

  setup: function () {
    this.$().dropdown({
      apiSettings: {
        url: this.get('query-url'),
        onResponse: function (response) {
          var documents = Ember.ArrayProxy.create({content: Ember.A(response.documents)});
          var results = documents.map(function (item, index, enumerable) {
            return {name: item.navn, value: item._id};
          });
          return {success: true, results: results};
        }
      },
      // onHide: Ember.run.bind(this, this.onHide),
      onChange: Ember.run.bind(this, this.onChange)
    }).dropdown('set text', this.get('text'));

  }.on('didInsertElement'),

  onHide: function () {
    // Need to trigger blur manually to perform validation on blur
    let input = this.$('input');
    if (input.val() === '') {
      // No value was selected
      input.trigger('blur');
    }
  },

  onChange: function (value, text, $choice) {
    if (this.get('attrs.action')) {

      if (!this.get('attrs.value')) {
        this.$().dropdown('clear');
      }

      this.sendAction('action', value, text);

    } else {
      this.set('value', value);
      this.set('text', text);
    }
  },

  updateDropdownValue: function () {
    this.$().dropdown('set value', this.get('value'));
  }.observes('value'),

  updateDropdownText: function () {
    this.$().dropdown('set text', this.get('text'));
  }.observes('text')

});
