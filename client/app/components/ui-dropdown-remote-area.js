import Ember from 'ember';

export default Ember.Component.extend({

  setup: function () {
    this.$('.ui.dropdown').dropdown({
      apiSettings: {
        url: '/api/v1/area/?navn=~{query}&status=Offentlig',
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
    this.sendAction('action', value);
    this.$('input[type="text"]').val('');
    this.$('div.text').text('');
  }
});
