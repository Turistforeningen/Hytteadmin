import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  groups: Ember.inject.controller(),
  user: Ember.inject.controller('session'),

  errors: [],

  validationRules: [
    {
      identifier: 'navn',
      rules: [
        {
          type: 'empty',
          prompt: 'Hytta må ha et navn'
        }
      ]
    },
    {
      identifier: 'hyttetype',
      rules: [
        {
          type: 'empty',
          prompt: 'Du må velge en hyttetype'
        }
      ]
    },
    {
      identifier: 'juridisk_eier',
      rules: [
        {
          type: 'empty',
          prompt: 'Du må velge hvilken gruppe som eier hytta'
        }
      ]
    },
    {
      identifier: 'vedlikeholdes_av',
      rules: [
        {
          type: 'empty',
          prompt: 'Du må velge hvilken gruppe som driver hytta'
        }
      ]
    },
    {
      identifier: 'kontaktinfo_gruppe',
      rules: [
        {
          type: 'empty',
          prompt: 'Du må velge hvilken gruppe kontaktopplysninger skal hentes fra'
        }
      ]
    },
    {
      identifier: 'beskrivelse',
      rules: [
        {
          type: 'empty',
          prompt: 'Du må legge inn en beskrivelse av hytta'
        }
      ]
    }
  ],

  invalidErrorMessage: {message: 'Hytta kunne ikke lagres fordi alle feltene ikke er riktig fyllt ut. Gå over feltene med feilmeldinger og prøv igjen.'},
  unknownErrorMessage: {message: 'Vi kunne dessverre ikke lagre hytta på grunn av en ukjent feil.'},

  actions: {
    save: function () {
      this.get('model').save().then((response) => {
        this.get('errors').clear();
      }, (err) => {
        if (err instanceof DS.InvalidError) {
          this.get('errors').addObject(this.get('invalidErrorMessage'));

        } else {
          this.get('errors').addObject(this.get('unknownErrorMessage'));
        }
      });
    },

    publish: function () {
      this.set('model.status', 'Offentlig');
      this.send('save');
    },

    unpublish: function () {
      this.set('model.status', 'Kladd');
      this.send('save');
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
    },

    setKontaktinformasjonISesongFromJuridiskEier: function () {
      console.log('setKontaktinformasjonISesongFromJuridiskEier', arguments);
    },

    setKontaktinformasjonByGruppeId: function (key, val) {
      console.log('setKontaktinformasjonByGruppeId', key, val);
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
