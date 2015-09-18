import Ember from 'ember';

export default Ember.Component.extend({
  list: null,
  params: {},
  session: null,
  bindAttributes: ['list', 'params', 'session'],

  FILTER_RELATION_CHOICES: [
    Ember.Object.create({value: 'privat.vedlikeholdes_av', label: 'drives av'}),
    Ember.Object.create({value: 'privat.juridisk_eier', label: 'eies av'})
  ],

  relation: null,
  gruppe: null,

  onRelationGruppeChange: function () {
    var params = {};
    var relation = this.get('relation.value');
    var gruppe = this.get('gruppe.id');

    if (gruppe) {
      params[relation] = gruppe;
      this.set('params', params);
    }

  }.observes('relation', 'gruppe.id'),

  setup: function () {
    this.set('relation', this.get('FILTER_RELATION_CHOICES.firstObject'));
    this.set('gruppe', this.get('session.model.primærgruppe'));

  }.on('didInsertElement')

});
