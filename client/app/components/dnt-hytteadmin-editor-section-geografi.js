import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    addOmrådeById: function (id) {
      this.store.find('area', id).then(Ember.run.bind(this, function (area) {
        this.get('model.områder').pushObject(area);
      }));
    },

    removeOmråde: function (område) {
      let områder = this.get('model.områder') || [];
      områder.removeObject(område);
    }
  }

});
