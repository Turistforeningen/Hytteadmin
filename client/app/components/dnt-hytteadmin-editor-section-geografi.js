import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    addTurkart: function (navn) {
      navn = navn || {};
      let turkart = this.get('model.turkart') || [];
      turkart.addObject(navn);
      this.set('model.turkart', turkart);
    },

    removeTurkart: function (object) {
      let turkart = this.get('model.turkart') || [];
      turkart.removeObject(object);
      this.set('model.turkart', turkart);
    },

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
