import Ember from 'ember';

export default Ember.Controller.extend({
  groups: Ember.inject.controller(),

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
  },

  tilkomst_kollektiv_enabled: false,

  toggleTilkomstKollektiv: function () {
    var hasSommerKollektiv = !!this.get('model.tilkomst.kollektiv.sommer.length');
    var hasVinterKollektiv = !!this.get('model.tilkomst.kollektiv.vinter.length');
    var tilkomsstKollektivEnabled = (hasSommerKollektiv || hasVinterKollektiv);

    this.set('tilkomst_kollektiv_enabled', tilkomsstKollektivEnabled);
    console.log('tilkomst_kollektiv_enabled', tilkomsstKollektivEnabled);

  }.observes('model.tilkomst.kollektiv.sommer', 'model.tilkomst.kollektiv.vinter')

});
