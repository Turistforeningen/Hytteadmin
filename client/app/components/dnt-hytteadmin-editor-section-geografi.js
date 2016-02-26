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
      const model = this.get('model');
      if (typeof model.addOmrådeById === 'function') {
        model.addOmrådeById(id);
      }
    },

    removeOmråde: function (område) {
      let områder = this.get('model.områder') || [];
      områder.removeObject(område);
    }
  }

});
