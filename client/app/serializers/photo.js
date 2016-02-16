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
    const normalizedHash = resourceHash;
    const kategorier = this.get('KATEGORI_CHOICES');
    const tags = Ember.A(normalizedHash.tags || []);

    const kategori = tags.find((item, index, enumerable) => {
      return kategorier.indexOf(item) !== -1;
    });

    tags.removeObjects(kategorier);

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

    json.tags = tags;

    return json;
  }

});
