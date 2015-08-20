import Ember from 'ember';

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
      onChange: Ember.run.bind(this, this.onChange)
    });
  }.on('didInsertElement'),

  onChange: function (value, text, $choice) {
    this.set('value', value);
  },

  updateDropdownValue: function () {
    this.$().dropdown('set value', this.get('value'));
  }.observes('value'),

  updateDropdownText: function () {
    this.$().dropdown('set text', this.get('text'));
  }.observes('text')

});
