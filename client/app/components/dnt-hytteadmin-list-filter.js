import Ember from 'ember';

export default Ember.Component.extend({
  params: {},
  bindAttributes: ['params'],

  FILTER_RELATION_CHOICES: [
    Ember.Object.create({value: 'vedlikeholdes_av', label: 'drives av'}),
    Ember.Object.create({value: 'juridisk_eier', label: 'eies av'})
  ],

  relation: null,
  gruppe: null,

  actions: {
    setGruppe: function (value, text) {
      this.set('gruppe', {
        id: value,
        navn: text
      });
    }
  },

  onParamChange: function () {
    this.set('params', {
      relation: this.get('relation.value'),
      gruppe: this.get('gruppe')
    });

  }.observes('relation', 'gruppe'),

  setup: function () {
    let params = this.get('params');

    if (params) {
      this.set('relation', params.relation ? this.get('FILTER_RELATION_CHOICES').findBy('value', params.relation) : this.get('FILTER_RELATION_CHOICES.firstObject'));
      this.set('gruppe', params.gruppe);
    }

  }.on('didInsertElement')

});
