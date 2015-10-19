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
        this.store.findRecord('cabin', response.get('id')).then(function (record) {
          let bilder = record.get('bilder');
          if (bilder.get('length')) {
            bilder.forEach(function (item, index, enumerable) {
              // TODO: Saving item is only necessary if item.hasDirtyAttributes,
              // but that property does not seem to be catching all changes
              item.save();
            });
          }
        });

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

    addÅpningstiderPeriode: function () {
      let åpningstider = this.get('model.privat.åpningstider') || this.set('model.privat.åpningstider', []);
      åpningstider.addObject({});
    },

    removeÅpningstiderPeriode: function (periode) {
      this.get('model.privat.åpningstider').removeObject(periode);
    },

    setKunBestilling: function (kunBestilling) {
      console.log('kunBestilling', kunBestilling);
      this.set('model.privat.kun_bestilling', kunBestilling);
    },

    setKontaktinformasjonISesongFromJuridiskEier: function () {
      console.log('setKontaktinformasjonISesongFromJuridiskEier', arguments);
    },

    setKontaktinformasjonByGruppeId: function (key, val) {
      console.log('setKontaktinformasjonByGruppeId', key, val);
    },

    createPhoto: function (data) {
      // console.log('controller:cabin:actions:createPhoto');
      let photo = this.store.createRecord('photo', data);

      photo.save().then((photo) => {
        this.get('model.bilder').addObject(photo);
      });
    },

    removePhoto: function (photo, options) {
      options = options || {};
      this.get('model.bilder').removeObject(photo);
      if (options.destroy === true) {
        photo.destroyRecord();
      }
    }
  },

  tilkomst_kollektiv_enabled: false,

  // TODO: Replace with computed property with both getter and setter
  enableTilkomstKollektiv: function () {
    var hasSommerKollektiv = !!this.get('model.tilkomst.kollektiv.sommer.length');
    var hasVinterKollektiv = !!this.get('model.tilkomst.kollektiv.vinter.length');
    var tilkomsstKollektivEnabled = (hasSommerKollektiv || hasVinterKollektiv);

    if (tilkomsstKollektivEnabled) {
      this.set('tilkomst_kollektiv_enabled', true);
    }

  }.observes('model.tilkomst.kollektiv.sommer', 'model.tilkomst.kollektiv.vinter')

});
