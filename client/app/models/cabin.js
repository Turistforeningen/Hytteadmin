import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  BETJENINGSGRAD_CHOICES: [
    'Betjent',
    'Servering',
    'Selvbetjent',
    'Ubetjent',
    'Dagshytte',
    'Nødbu',
    'Utleie',
    'Stengt',
    'Nedlagt'
  ],

  FASILITETER_CHOICES: [
    '12v',
    '220v',
    'Badstu',
    'Båt',
    'Dusj',
    'Kano',
    'Kortbetaling',
    'Mobildekning',
    'Peis',
    'Servering',
    'Steikeovn',
    'Strømovn',
    'Sykkel',
    'Sykkelutleie',
    'Telefon',
    'Teltplass',
    'Tørkerom',
    'Utleie',
    'Vann',
    'Vedovn',
    'Wc'
  ],

  NØKKEL_CHOICES: [
    'Ulåst',
    'Spesialnøkkel',
    'DNT-nøkkel'
  ],

  HYTTETYPE_CHOICES: [
    'DNT-hytte',
    'Privat rabatthytte',
    'Privat hytte'
  ],

  TILRETTELEGGINGER_CHOICES: [
    'Barnevogn',
    'Rullestol',
    'Hund',
    'Skoleklasser',
    'Handikap'
  ],

  bilder: DS.hasMany('photo', {async: true}),
  beskrivelse: DS.attr('string'),
  betjeningsgrad: DS.attr('string'),
  byggeår: DS.attr('number'),
  description: DS.attr('string'),
  // checksum: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  // endret: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  fasiliteter: DS.attr('array', {defaultValue: []}),
  fylke: DS.attr('string'),
  geojson: DS.attr('object', {defaultValue: {type: "Point", properties: {}, coordinates: []}}),
  grupper: DS.attr('array', {defaultValue: []}),
  hyttetype: DS.attr('string'),
  kart: DS.attr('string'),
  kommune: DS.attr('string'),
  kontaktinfo: DS.attr('array', {defaultValue: [{'type': 'I sesong'}]}),
  lenker: DS.attr('array', {defaultValue: []}), // object[]
  lisens: DS.attr('string', {defaultValue: 'CC BY-SA 4.0'}),
  navn: DS.attr('string'),
  navn_alt: DS.attr('array', {defaultValue: []}),
  navngiving: DS.attr('string'), // TODO: Should be computed by either Hytteadmin API endpoint or Hytteadmin Client
  områder: DS.hasMany('area', {async: true}),
  privat: DS.attr('object', {defaultValue: {}}),
  juridisk_eier: DS.belongsTo('group', {async: true}),
  vedlikeholdes_av: DS.belongsTo('group', {async: true}),
  ssr_id: DS.attr('number'),
  status: DS.attr('string', {defaultValue: 'Kladd'}),
  url: DS.attr('string'),
  tilkomst: DS.attr('object', {defaultValue: {
    'privat': {'sommer': undefined, 'vinter': undefined},
    'kollektiv': {'sommer': undefined, 'vinter': undefined}
  }}),
  tags: DS.attr('array', {defaultValue: ['Hytte']}),
  // tilbyder: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  tilrettelegginger: DS.attr('array', {defaultValue: []}),
  turkart: DS.attr('array', {defaultValue: []}),

  er_helårs: Ember.computed('privat.åpningstider.[]', {
    get: function () {
      var åpningstider = this.get('privat.åpningstider') || [];
      return !!åpningstider.find(function (item, index, list) {
        return (item.helårs === 'Ja');
      });
    },
    set: function (key, value) {
      var åpningstid = this.get('privat.åpningstider.firstObject') || {};
      switch (value) {
        case true:
          åpningstid.helårs = 'Ja';
          delete åpningstid.fra;
          delete åpningstid.til;
          this.set('privat.åpningstider', [åpningstid]);
          return value;

        case false:
          delete åpningstid.helårs;
          this.set('privat.åpningstider', [åpningstid]);
          return value;

        default:
          break;
      }
    }
  }),

  updateJuridiskEier: function () {
    var updateJuridiskEierId = this.get('privat.juridisk_eier');
    if (updateJuridiskEierId) {
      this.store.findRecord('group', updateJuridiskEierId).then(Ember.run.bind(this, function (group) {
        this.set('juridisk_eier', group);

        if (!this.get('privat.vedlikeholdes_av')) {
          this.set('privat.vedlikeholdes_av', updateJuridiskEierId);
        }

      }));

    } else {
      this.set('juridisk_eier', undefined);
    }

  }.observes('privat.juridisk_eier'),

  updateVedlikeholdesAv: function () {
    var vedlikeholdesAvId = this.get('privat.vedlikeholdes_av');
    if (vedlikeholdesAvId) {
      this.store.find('group', vedlikeholdesAvId).then(Ember.run.bind(this, function (group) {
        this.set('vedlikeholdes_av', group);
        // TODO: Add method to model for determining this
        if (!this.get('kontaktinfo_gruppe.gruppe_id') || this.get('kontaktinfo_gruppe.gruppe_id') === this.get('privat.juridisk_eier')) {
          this.setKontaktinfoGruppeById(vedlikeholdesAvId);
        }
      }));

    } else {
      this.set('vedlikeholdes_av', undefined);
    }

  }.observes('privat.vedlikeholdes_av'),

  enable_kun_bestilling_kommentar: function () {
    var kun_bestilling = this.get('privat.kun_bestilling');
    return (kun_bestilling === 'Ja' || kun_bestilling === 'Delvis');
  }.property('privat.kun_bestilling'),

  kontaktinfo_i_sesong: Ember.computed('kontaktinfo.[]', 'kontaktinfo.@each.type', {
    get: function () {
      // console.log('kontaktinfo_i_sesong:get');
      return this.get('kontaktinfo').findBy('type', 'I sesong');
    },
    set: function (key, value) {
      // console.log('kontaktinfo_i_sesong:set', value);
      var kontaktinfo = this.get('kontaktinfo');
      var existingKontaktinfoISesong = kontaktinfo.findBy('type', 'I sesong');

      if (existingKontaktinfoISesong) {
        kontaktinfo.removeObject(existingKontaktinfoISesong);
      }

      if (value) {
        Ember.set(value, 'type', 'I sesong');
        kontaktinfo.addObject(value);
      }

      return value;
    }
  }),

  kontaktinfo_utenom_sesong: Ember.computed('kontaktinfo.[]', 'kontaktinfo.@each.type', {
    get: function () {
      // console.log('kontaktinfo_utenom_sesong:get');
      return this.get('kontaktinfo').findBy('type', 'Utenom sesong');
    },
    set: function (key, value) {
      // console.log('kontaktinfo_utenom_sesong:set', value);
      var kontaktinfo = this.get('kontaktinfo');
      var existingKontaktinfoUtenomSesong = kontaktinfo.findBy('type', 'Utenom sesong');

      if (existingKontaktinfoUtenomSesong) {
        kontaktinfo.removeObject(existingKontaktinfoUtenomSesong);
      }

      if (value) {
        Ember.set(value, 'type', 'Utenom sesong');
        kontaktinfo.addObject(value);
      }

      return value;
    }
  }),

  direkte_kontakt: Ember.computed('kontaktinfo_i_sesong', 'kontaktinfo_utenom_sesong', {
    get: function () {
      // console.log('direkte_kontakt:get');
      return !!this.get('kontaktinfo').findBy('type', 'Utenom sesong');
    },
    set: function (key, value) {
      // console.log('direkte_kontakt:set', value);
      var kontaktinfoISesong = this.get('kontaktinfo_i_sesong') || {};
      var kontaktinfoUtenomSesong = this.get('kontaktinfo_utenom_sesong') || {};

      if (value) {
        // Cabin has custom kontaktinfo_i_sesong.
        // Move default info to `type: "Utenom sesong"` and create empty object for `type: "I sesong"`
        this.set('kontaktinfo_utenom_sesong', kontaktinfoISesong);
        this.set('kontaktinfo_i_sesong', {});

      } else {
        // Cabin does not have custom kontaktinfo_i_sesong: Only use `type: "I sesong"`.
        this.set('kontaktinfo_i_sesong', kontaktinfoUtenomSesong);
        this.set('kontaktinfo_utenom_sesong', undefined);
      }

      return value;
    }
  }),

  setKontaktinfoGruppeById: function (id) {
    if (id) {
      this.store.findRecord('group', id).then((record) => {
        this.set('kontaktinfo_gruppe', {
          gruppe_id: record.get('id'),
          navn: record.get('navn'),
          adresse1: record.get('kontaktinfo_primærkontakt.adresse1'),
          adresse2: record.get('kontaktinfo_primærkontakt.adresse2'),
          epost: record.get('kontaktinfo_primærkontakt.epost'),
          postnummer: record.get('kontaktinfo_primærkontakt.postnummer'),
          poststed: record.get('kontaktinfo_primærkontakt.poststed'),
          telefon: record.get('kontaktinfo_primærkontakt.telefon')
        });
      });

    } else {
      this.set('kontaktinfo_gruppe', undefined);
    }
  },

  kontaktinfo_gruppe: Ember.computed('kontaktinfo_i_sesong.gruppe_id', 'kontaktinfo_utenom_sesong.gruppe_id', {
    get: function () {
      // console.log('kontaktinfo_gruppe:get');
      var kontaktinfoISesong = this.get('kontaktinfo_i_sesong');
      var kontaktinfoUtenomSesong = this.get('kontaktinfo_utenom_sesong');
      return kontaktinfoUtenomSesong || kontaktinfoISesong;
    },
    set: function (key, value) {
      // console.log('kontaktinfo_gruppe:set', value);
      if (value) {
        if (this.get('direkte_kontakt')) {
          this.set('kontaktinfo_utenom_sesong', value);

        } else {
          this.set('kontaktinfo_i_sesong', value);
        }

      } else {
        this.set('kontaktinfo', []);
      }

      return value;
    }
  }),

  latitude: Ember.computed('geojson.coordinates.1', {
    get: function () {
      return this.get('geojson.coordinates.1');
    },
    set: function (key, value) {
      let latitude = parseFloat(value, 10);

      if (!isNaN(latitude)) {
        this.set('geojson.coordinates.1', latitude);
      }

      return value;
    }
  }),

  longitude: Ember.computed('geojson.coordinates.0', {
    get: function () {
      return this.get('geojson.coordinates.0');
    },
    set: function (key, value) {
      let longitude = parseFloat(value, 10);

      if (!isNaN(longitude)) {
        this.set('geojson.coordinates.0', longitude);
      }

      return value;
    }
  }),

  lat_lng: Ember.computed('geojson.coordinates.0', 'geojson.coordinates.1', {
    get: function () {
      let latitude = this.get('geojson.coordinates.1');
      let longitude = this.get('geojson.coordinates.0');
      let latLng;

      if (Ember.typeOf(latitude) === 'number' && Ember.typeOf(longitude) === 'number') {
        latLng = [latitude, longitude];
      }

      return latLng;
    }
  }),

  har_posisjon: Ember.computed('geojson.coordinates.0', 'geojson.coordinates.1', {
    get: function () {
      return !isNaN(this.get('geojson.coordinates.1')) && !isNaN(this.get('geojson.coordinates.0'));
    }
  }),

  er_publisert: Ember.computed('status', {
    get: function () {
      return (this.get('status') === 'Offentlig') ? true : false;
    }
  }),

  har_spesialnøkkel: Ember.computed('privat.åpningstider.@each.nøkkel', {
    get: function () {
      let hasSpesialnøkkel = false;
      let åpningstider = this.get('privat.åpningstider') || [];

      if (åpningstider.get('length')) {
        hasSpesialnøkkel = !!åpningstider.findBy('nøkkel', 'Spesialnøkkel');
      }

      return hasSpesialnøkkel;
    }
  }),

  updateNavngiving: function () {
    let navngiving = '';

    // Start navngiving with the name of the cabin
    let id = this.get('id');
    let navn = this.get('navn') || 'Hytte uten navn';

    if (id) {
      navngiving += '<a href="http://www.ut.no/hytte/' + id + '">' + navn + '</a>';

    } else {
      navngiving += navn;
    }

    // Add cabin eier or driver
    let gruppe = this.get('juridisk_eier') || this.get('drives_av');
    let gruppeId = gruppe.get('id');
    let gruppeNavn = gruppe.get('navn');

    // TODO: Use session user name as fallback
    if (gruppeId && gruppeNavn) {
      navngiving += ' av ';
      navngiving += '<a href="http://www.ut.no/gruppe/' + gruppe.get('id') + '">' + gruppe.get('navn') + '</a>';
    }

    navngiving += '.';

    let lisenser = {
      'CC BY 4.0': 'http://creativecommons.org/licenses/by/4.0/deed.no',
      'CC BY-SA 4.0': 'http://creativecommons.org/licenses/by-sa/4.0/deed.no',
      'CC BY-ND 4.0': 'http://creativecommons.org/licenses/by-nd/4.0/deed.no',
      'CC BY-NC 4.0': 'http://creativecommons.org/licenses/by-nc/4.0/deed.no',
      'CC BY-NC-SA 4.0': 'http://creativecommons.org/licenses/by-nc-sa/4.0/deed.no',
      'CC BY-NC-ND 4.0': 'http://creativecommons.org/licenses/by-nc-nd/4.0/deed.no'
    };

    let lisens = this.get('lisens');
    navngiving += ' Tilgjengelig under <a href="' + lisenser[lisens] + '" target="_blank" rel="license">' + lisens + ' lisens</a>.';

    this.set('navngiving', navngiving);

  }.observes('navn', 'juridisk_eier.navn', 'vedlikeholdes_av.navn', 'lisens').on('ready')

});
