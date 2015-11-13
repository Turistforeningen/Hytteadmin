import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({

  KATEGORI_CHOICES: [
    'sommer',
    'vinter',
    'interiør'
  ],

  normalize: function (modelClass, resourceHash, prop) {
    var normalizedHash = resourceHash;

    const kategorier = this.get('KATEGORI_CHOICES');
    const tags = normalizedHash.tags || [];
    let kategori;

    for (let i = 0; i < kategorier.length; i++) {
      if (!kategori && tags.indexOf(kategorier[i]) !== -1) {
        kategori = kategorier[i];
      }
    }

    for (let i = 0; i < kategorier.length; i++) {
      let kategoriInTags = tags.indexOf(kategorier[i]);
      if (kategoriInTags !== -1) {
        tags.splice(kategoriInTags, 1);
      }
    }

    if (kategori) {
      normalizedHash.kategori = kategori;
    }

    return this._super(modelClass, normalizedHash, prop);
  },

  serialize: function (snapshot, options) {
    var json = this._super(snapshot, options);

    const kategorier = this.get('KATEGORI_CHOICES');
    let tags = json.tags || [];
    const kategori = json.kategori;

    if (kategori) {
      delete json.kategori;
      tags.unshift(kategori);

    } else {
      for (let i = 0; i < kategorier.length; i++) {
        let kategoriInTags = tags.indexOf(kategorier[i]);
        if (kategoriInTags !== -1) {
          tags.splice(kategoriInTags, 1);
        }
      }
    }

    return json;
  }

});
