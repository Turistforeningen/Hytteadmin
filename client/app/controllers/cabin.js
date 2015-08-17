import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['groups'],

  actions: {
    save: function () {
      this.get('model').save();
    },

    setJuridiskEierById: function (id) {
      var owner = this.store.find('group', id);
      this.get('model').set('juridisk_eier', owner);
    },

    addOmrådeById: function (id) {
      this.store.find('area', id).then(Ember.run.bind(this, function (area) {
        this.get('model.områder').pushObject(area);
      }));
    },

    addÅpningstiderPeriode: function () {
      this.get('model.privat.åpningstider').addObject({});
    },

    removeÅpningstiderPeriode: function (periode) {
      this.get('model.privat.åpningstider').removeObject(periode);
    },

    addSted: function (id) {},

    setKunBestilling: function (kunBestilling) {
      console.log('kunBestilling', kunBestilling);
      this.set('model.privat.kun_bestilling', kunBestilling);
    }
  }
});
