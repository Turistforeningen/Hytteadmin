import Ember from 'ember';
import DS from 'ember-data';
import Validation from '../mixins/validation';

export default DS.Model.extend(Validation, {

  KATEGORI_CHOICES: [
    Ember.Object.create({value: 'sommer', label: 'Sommer'}),
    Ember.Object.create({value: 'vinter', label: 'Vinter'}),
    Ember.Object.create({value: 'interiør', label: 'Innendørs'})
  ],

  TAGS_CHOICES: ['action', 'ake', 'akrobatikk', 'aksjon', 'aktiv', 'anorakk', 'appelsin', 'august', 'balanse', 'barn', 'blid', 'bre', 'breklatring', 'brevandring', 'briller', 'brodder', 'bærtur', 'bål', 'bålmat', 'båt', 'camp', 'cover', 'dagstur', 'dame', 'damer', 'dessert', 'detaljbilde', 'dnt', 'dnt-hytte', 'dnt ung', 'dråper', 'dugnad', 'dyr', 'elv', 'energi', 'eng', 'familie', 'fellestur', 'festival', 'fiske', 'fjell', 'fjellflørting', 'fjellski', 'fjelltopp', 'fjelltur', 'fjord', 'fjortis', 'flagg', 'flørting', 'fottur', 'fred', 'friluftsliv', 'gapahuk', 'gassbrenner', 'glad', 'glede', 'gps', 'grave', 'grottetur', 'gruppebilde', 'gutt', 'gutter', 'gård', 'hav', 'heia', 'helgetur', 'himmel', 'historie', 'historikk', 'hjelm', 'hopp', 'hund', 'husdyr', 'hverdagstur', 'hygge', 'hytte', 'hyttebok', 'hytteguide', 'hyttekos', 'hytter', 'hyttesamler', 'hytte til hytte', 'hyttetur', 'hyttevert', 'høst', 'høstaktiviteter', 'høstferie', 'høstfjellet', 'høsttur', 'innsjø', 'instruktør', 'interiør', 'is', 'isbre', 'isklatring', 'isøks', 'jente', 'jenter', 'jubel', 'jul', 'kaffe', 'kajakk', 'kajakkpadling', 'kajakktur', 'kake', 'kaldt', 'karabin', 'kart', 'kiting', 'kjærester', 'kjærlighet', 'klart', 'klatre', 'klatrekurs', 'klatresko', 'klatretau', 'klatring', 'klem', 'klipper', 'klær', 'kompass', 'kopp', 'kos', 'kurs', 'kveld', 'kvinne', 'kvinner', 'kvist', 'kvisteløype', 'kyss', 'kyst', 'landskap', 'langrenn', 'langrute', 'langtur', 'latter', 'le', 'leder', 'leir', 'leirliv', 'lek', 'leke', 'logo', 'lommelykttur', 'lykt', 'lys', 'løp', 'løpe', 'løype', 'maling', 'mann', 'mat', 'matlaging', 'menn ', 'menneske', 'merke', 'merking', 'middag', 'mobiltelefon', 'mor', 'morgen', 'mose', 'musikk', 'måltid', 'månelyst', 'natt', 'natur', 'naturen', 'nordlys', 'norge', 'norsk', 'nyttår', 'nærhet', 'nærmiljø', 'nærtur', 'opptur', 'orientering', 'padle', 'padling', 'par', 'partnere', 'pause', 'pinnebrød', 'planlegging', 'portrett', 'publikum', 'pulk', 'påkledning', 'regn', 'reise', 'robåt', 'rullestol', 'ryggsekk', 'rødekors', 'sekk', 'selvbetjent', 'sender/mottaker', 'senior', 'sikkerhet', 'sikkerhetsutstyr', 'siluett', 'singel', 'ski', 'skihopp', 'skilek', 'skilt', 'skilting', 'skiløype', 'skisko', 'skitur', 'skiutstyr', 'skog', 'skogtur', 'skole', 'skolehytter', 'skoletur', 'skred', 'skredfare', 'skredsøker', 'skredutstyr', 'smarttelefon', 'smil', 'sne', 'snekring', 'snø', 'snøhuletur', 'snøskred', 'sol', 'solbriller', 'solnedgang', 'soloppgang', 'sommer', 'sopptur', 'sosialt', 'sovepose', 'sovesal', 'spade', 'spill', 'spor', 'staver', 'stearinlys', 'steinhytte', 'stemning', 'sti', 'stier', 'stillenatur', 'stillhet', 'stjerner', 'sykkel', 'sykkeltur', 'symboler', 'sæter', 'søkestang', 'telefon', 'telt', 'tenåring', 'terreng', 'tid', 'tilrettelegging', 'tinder', 'tinderangling', 'tog', 'toget', 'topp', 'topptur', 'trilletur', 'trygg', 'tur', 'turbo', 'turdag', 'turfølge', 'turglad', 'turglede', 'turinfo', 'turistforeningshytte', 'turisthytte', 'turlag', 'turleder', 'turledere', 'turmat', 'turpartnere', 'turplanlegging', 'turskilt', 'turutstyr', 'tyttebær', 'tåke', 'ubetjent', 'ung', 'ungdom', 'ut', 'ute', 'uteaktiviteter', 'utsikt', 'utstyr', 'vandring', 'vann', 'varde', 'varding', 'vei', 'veivalg', 'venner', 'vennetur', 'vertskap', 'vidde', 'villmark', 'vind', 'vindsekk', 'vinter', 'vinteraktivitet', 'vinteraktiviteter', 'vinterbekledning', 'vinterferie', 'vinterfjellet', 'vintermerking', 'vinterruter', 'vintertur', 'vintervett', 'vær', 'vår', 'vårskitur', 'x-ung', 'yatzy', 'årstid'],

  beskrivelse: DS.attr('string', {validationRules: [{type: 'empty'}]}),
  checksum: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  endret: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  eier: DS.attr('object'),
  fotograf: DS.attr('object', {defaultValue: {}}),
  geojson: DS.attr('object'),
  grupper: DS.attr('array'),
  img: DS.attr('object'),
  kreditering: DS.attr('string'), // NOTE: Not documented at nasjonalturbase.no
  lisens: DS.attr('string', {defaultValue: 'CC BY-SA 4.0'}),
  navn: DS.attr('string'),
  navngiving: DS.attr('string'),
  privat: DS.attr('object'),
  status: DS.attr('string'),
  tags: DS.attr('array'),
  tilbyder: DS.attr('string'), // TODO: Add support for readonly as this is set by NTB
  kategori: DS.attr('string'),

  _kategori: Ember.computed('tags.firstObject', {
    get: function () {
      // NOTE: Use this code if a tag should only qualify as a category if first in tags array
      const firstTag = this.get('tags.firstObject');
      const kategorier = this.get('KATEGORI_CHOICES').getEach('value');
      let kategori;

      if (firstTag && kategorier.indexOf(firstTag) !== -1) {
        kategori = firstTag;
      }

      return kategori;

      // NOTE: Use this code if any tag representing a category should only qualify as a one
      /* const photoTags = this.get('tags') || [];
      const kategorier = this.get('KATEGORI_CHOICES').getEach('value');
      let kategori;
      kategorier.forEach((item, index, enumerable) => {
        if (!kategori && photoTags.indexOf(item) !== -1) {
          kategori = item;
        }
      });

      return kategori; */
    },
    set: function (key, value) {
      const kategorier = this.get('KATEGORI_CHOICES').getEach('value');
      const tags = this.get('tags') || [];

      tags.removeObjects(kategorier);

      if (Ember.typeOf(value) === 'string') {
        // NOTE: Only add tag if it is a string (typically to avoid undefined)
        tags.unshiftObject(value);
      }
      this.set('tags', tags);

      return value;
    }
  }),

  fri_bruk: Ember.computed('lisens', {
    get: function () {
      return this.get('lisens') === 'CC BY-SA 4.0';
    },
    set: function (key, value) {
      let lisens = value === true ? 'CC BY-SA 4.0' : 'CC BY-NC-SA 4.0';
      this.set('lisens', lisens);

      return value;
    }
  }),

  updateNavngiving: function () {
    let navngiving = '';

    // Start navngiving with the name of the photo
    let id = this.get('id');
    let navn = this.get('navn') || 'Bilde uten navn';

    navngiving += navn;

    // Add cabin eier or driver
    let fotografNavn = this.get('fotograf.navn') || 'ukjent';

    navngiving += ' av ' + fotografNavn + '.';

    let lisenser = {
      'CC BY 4.0': 'http://creativecommons.org/licenses/by/4.0/deed.no',
      'CC BY-SA 4.0': 'http://creativecommons.org/licenses/by-sa/4.0/deed.no',
      'CC BY-ND 4.0': 'http://creativecommons.org/licenses/by-nd/4.0/deed.no',
      'CC BY-NC 4.0': 'http://creativecommons.org/licenses/by-nc/4.0/deed.no',
      'CC BY-NC-SA 4.0': 'http://creativecommons.org/licenses/by-nc-sa/4.0/deed.no',
      'CC BY-NC-ND 4.0': 'http://creativecommons.org/licenses/by-nc-nd/4.0/deed.no'
    };

    let lisens = this.get('lisens');

    if (lisenser[lisens]) {
      navngiving += ' Tilgjengelig under <a href="' + lisenser[lisens] + '" target="_blank" rel="license">' + lisens + ' lisens</a>.';
    }

    this.set('navngiving', navngiving);

  }.observes('navn', 'fotograf.navn', 'fotograf.epost', 'lisens').on('ready')

});
