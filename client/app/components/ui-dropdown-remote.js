import Ember from 'ember';

// TODO: Should extend ui-dropdown instead, to inherit properties and methods
export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['ui', 'search', 'selection', 'dropdown', 'fluid'],

  value: null,
  text: null,

  bindAttributes: ['value', 'text'],

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
      onHide: Ember.run.bind(this, this.onHide),
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

      this.sendAction('action', value);

    } else {
      this.set('value', value);
    }
  },

  updateDropdownValue: function () {
    this.$().dropdown('set value', this.get('value'));
  }.observes('value'),

  updateDropdownText: function () {
    this.$().dropdown('set text', this.get('text'));
  }.observes('text')

});
