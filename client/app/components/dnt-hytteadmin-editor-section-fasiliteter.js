import Ember from 'ember';

export default Ember.Component.extend({

  TILRETTELEGGINGER_UNSELECTED_CHOICES: function () {
    var tilrettelegginger = this.get('model.tilrettelegginger');
    var selectedTilretteleggingerTyper;

    if (tilrettelegginger) {
      selectedTilretteleggingerTyper = tilrettelegginger.map(function (item, index, list) {
        return item.type;
      });
    } else {
      selectedTilretteleggingerTyper = [];
    }

    return Ember.copy(this.get('model.TILRETTELEGGINGER_CHOICES')).removeObjects(selectedTilretteleggingerTyper);
  }.property('model.TILRETTELEGGINGER_CHOICES', 'model.tilrettelegginger.[]'),

  FASILITETER_UNSELECTED_CHOICES: function () {
    var fasiliteter = this.get('model.fasiliteter');
    var selectedFasiliteter;

    if (fasiliteter) {
      selectedFasiliteter = fasiliteter.map(function (item, index, list) {
        return item.type;
      });
    } else {
      selectedFasiliteter = [];
    }

    return Ember.copy(this.get('model.FASILITETER_CHOICES')).removeObjects(selectedFasiliteter);
  }.property('model.FASILITETER_CHOICES', 'model.fasiliteter.[]'),

  actions: {
    addFasilitet: function (fasilitet) {
      if (fasilitet) { // NOTE: Prevents adding empty fasilitet on dropdown clear
        var fasiliteter = this.get('model.fasiliteter') || [];
        fasiliteter.addObject({type: fasilitet, kommentar: ''});
        this.set('model.fasiliteter', fasiliteter);
      }
    },

    addTilrettelegging: function (tilretteleggingType) {
      if (tilretteleggingType) { // NOTE: Prevents adding empty tilrettelegging on dropdown clear
        var tilrettelegginger = this.get('model.tilrettelegginger') || [];
        tilrettelegginger.addObject({type: tilretteleggingType});
        this.set('model.tilrettelegginger', tilrettelegginger);
      }
    }
  }
});
