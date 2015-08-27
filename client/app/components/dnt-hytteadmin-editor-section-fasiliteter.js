import Ember from 'ember';

export default Ember.Component.extend({

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

    return this.get('model.FASILITETER_CHOICES').removeObjects(selectedFasiliteter);
  }.property('model.FASILITETER_CHOICES', 'model.fasiliteter.[]'),

  actions: {
    addFasilitet: function (fasilitet) {
      if (fasilitet) { // NOTE: Prevents adding empty fasilitet on dropdown clear
        var fasiliteter = this.get('model.fasiliteter') || {};
        fasiliteter.addObject({type: fasilitet, kommentar: ''});
        this.set('model.fasiliteter', fasiliteter);
      }
    }
  }
});
