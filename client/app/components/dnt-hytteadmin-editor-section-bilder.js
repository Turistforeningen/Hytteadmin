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
      this.reorderPhotosByCategory();
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

  reorderPhotosByCategory: Ember.observer('sesong', function () {
    const photos = Ember.copy(this.get('bilder').toArray()).map(function (item, index) {
      item.set('index', index); // Add original index to use in custom sort function
      // http://stackoverflow.com/questions/3195941/sorting-an-array-of-objects-in-chrome
      return item;
    }) || [];

    const categories = this.get('KATEGORI_CHOICES').getEach('value');

    const reordered = photos.sort(function (a, b) {
      const kategoriA = a.get('kategori');
      const kategoriB = b.get('kategori');

      if (!kategoriA && !kategoriB) {
        return a.get('index') > b.get('index') ? 1 : -1;

      } else if (!kategoriA) {
        return 1;

      } else if (!kategoriB) {
        return -1;

      } else {
        return categories.indexOf(kategoriA) - categories.indexOf(kategoriB);
      }

    });

    this.set('bilder', reordered);
  }),

  sesong: undefined,

  onBilderLoaded: Ember.observer('bilder.isFulfilled', function () {
    if (this.get('bilder.isFulfilled')) {
      if (!this.get('sesong')) {
        this.set('sesong', this.get('bilder.firstObject.kategori'));
      }
      // this.reorderPhotos();
    }
  }),

  onSesongChange: Ember.observer('sesong', function () {
    const kategorier = this.get('KATEGORI_CHOICES').toArray();
    const sesong = this.get('sesong');
    const sesongObject = kategorier.findBy('value', sesong);

    kategorier.removeObject(sesongObject);
    kategorier.unshiftObject(sesongObject);

    this.set('KATEGORI_CHOICES', kategorier);
  }),

  _sesong: Ember.computed('bilder.firstObject.kategori', {
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
