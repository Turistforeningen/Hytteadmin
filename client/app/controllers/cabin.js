import Ember from 'ember';

export default Ember.Controller.extend({
  groups: Ember.inject.controller(),
  user: Ember.inject.controller(),

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

    setKunBestilling: function (kunBestilling) {
      console.log('kunBestilling', kunBestilling);
      this.set('model.privat.kun_bestilling', kunBestilling);
    },

    toggleTilkomstKollektiv: function (value) {
      if (value) {
        this.set('tilkomst_kollektiv_enabled', true);

        if (typeof this.get('model.tilkomst.kollektiv') === 'undefined') {
          this.set('model.tilkomst.kollektiv', {'sommer': undefined, 'vinter': undefined});
        }

      } else {
        this.set('model.tilkomst.kollektiv', undefined);
        this.set('tilkomst_kollektiv_enabled', false);
      }
    }
  },

  tilkomst_kollektiv_enabled: false,

  enableTilkomstKollektiv: function () {
    var hasSommerKollektiv = !!this.get('model.tilkomst.kollektiv.sommer.length');
    var hasVinterKollektiv = !!this.get('model.tilkomst.kollektiv.vinter.length');
    var tilkomsstKollektivEnabled = (hasSommerKollektiv || hasVinterKollektiv);

    if (tilkomsstKollektivEnabled) {
      this.set('tilkomst_kollektiv_enabled', true);
    }

  }.observes('model.tilkomst.kollektiv.sommer', 'model.tilkomst.kollektiv.vinter')

});
