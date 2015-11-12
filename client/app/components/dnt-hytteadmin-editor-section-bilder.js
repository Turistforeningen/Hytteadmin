import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    createPhoto: function (data) {
      this.sendAction('createPhoto', data);
    },

    removePhoto: function (photo, destroy) {
      this.sendAction('removePhoto', photo, destroy);
    },

    categorize: function (photo, category) {
      const bilde = this.get('bilder').findBy('id', photo.get('id'));
      bilde.set('kategori', category);
    }
  },

  SESONG_CHOICES: [
    Ember.Object.create({value: 'sommer', label: 'Sommer'}),
    Ember.Object.create({value: 'vinter', label: 'Vinter'})
  ],

  KATEGORI_CHOICES: [
    Ember.Object.create({value: 'sommer', label: 'Sommer'}),
    Ember.Object.create({value: 'vinter', label: 'Vinter'}),
    Ember.Object.create({value: 'interiør', label: 'Innendørs'})
  ],

  reorderPhotos: Ember.observer('sesong', function () {
    const bilder = Ember.copy(this.get('bilder').toArray());
    const kategorier = this.get('KATEGORI_CHOICES').getEach('value');

    let reordered = bilder.sort(function (a, b) {
      let kategoriA = a.get('kategori');
      let kategoriB = b.get('kategori');

      if (!kategoriA && !kategoriB) {
        return 1;

      } else if (!kategoriA) {
        return 1;

      } else if (!kategoriB) {
        return -1;

      } else {
        return kategorier.indexOf(kategoriA) - kategorier.indexOf(kategoriB);
      }

    });

    this.set('bilder', bilder);
  }),

  sesong: 'sommer',

  sesong_computed: Ember.computed('bilder.firstObject.kategori', {
    get: function () {
      let kategorier = this.get('KATEGORI_CHOICES').getEach('value');
      const sesonger = this.get('SESONG_CHOICES').getEach('value');
      let firstObjectKategori = this.get('bilder.firstObject.kategori');
      let sesong;

      if (sesonger.indexOf(firstObjectKategori) === -1) {
        sesong = sesonger.get('firstObject');

      } else {
        sesong = firstObjectKategori;
      }

      return sesong;
    },
    set: function (key, value) {
      const kategorier = this.get('KATEGORI_CHOICES').toArray();
      const sesong = kategorier.findBy('value', value);

      kategorier.removeObject(sesong);
      kategorier.unshiftObject(sesong);

      this.set('KATEGORI_CHOICES', kategorier);

      return value;
    }
  })

});
