/* globals Sortable */
import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    createPhoto: function (data) {
      this.sendAction('createPhoto', data);
    },
    removePhoto: function (photo, destroy) {
      this.sendAction('removePhoto', photo, destroy);
    }
  },

  SESONG_CHOICES: [
    Ember.Object.create({value: 'sommer', label: 'Sommer'}),
    Ember.Object.create({value: 'vinter', label: 'Vinter'})
  ],

  sortableLists: [],

  setup: function () {
    let sortableLists = [
      this.$('[data-category=""]')[0],
      this.$('[data-category="sommer"]')[0],
      this.$('[data-category="vinter"]')[0]
    ];

    sortableLists.forEach((item, index, enumerable) => {
      let sortable = Sortable.create(item, {
        draggable: '.dnt-photo-manager-list-item',
        group: 'photos',
        onAdd: Ember.run.bind(this, this.onAdd),
        onEnd: Ember.run.bind(this, this.onEnd)
      });

      this.sortableLists.addObject(sortable);
    });

  }.on('didInsertElement'),

  onEnd: function (e) {
    let mergedLists = [];

    this.sortableLists.forEach((item, index, enumerable) => {
      mergedLists.addObjects(item.toArray());
    });

    this.set('photosOrder', mergedLists);

    let reordered = this.get('bilder').toArray().sort(function (a, b) {
      return mergedLists.indexOf(a.get('id')) > mergedLists.indexOf(b.get('id'));
    });

    this.set('bilder', reordered);
  },

  onAdd: function (e) {
    let item = e.item;
    let itemId = item.dataset.id;
    let bilde = this.get('bilder').findBy('id', itemId);
    let category = e.to.dataset.category;

    this.categorize(bilde, category);
  },

  categorize: function (photo, category) {
    let tags = photo.get('tags') || [];
    tags.removeObjects(['sommer', 'vinter']);

    if (category) {
      tags.addObject(category);
    }
    photo.set('tags', tags);
  },

  sesong: Ember.computed('bilder.firstObject.tags', {
    get: function () {
      let sesonger = this.get('SESONG_CHOICES').getEach('value');
      let sesong = sesonger.get('firstObject');
      let tags = this.get('bilder.firstObject.tags');
      if (tags) {
        sesong = tags.find((item, index, enumerable) => {
          if (sesonger.indexOf(item) > -1) {
            return item;
          }
        }) || sesong;
      }

      return sesong;

    },
    set: function (key, value) {
      let sesong = value || this.get('SESONG_CHOICES.firstObject.value');
      let sesonger =  Ember.copy(this.get('SESONG_CHOICES').getEach('value'));
      let bilder = [];

      while (sesong !== sesonger.get('firstObject')) {
        sesonger.pushObject(sesonger.get('firstObject'));
        sesonger.removeAt(0);
      }

      for (let i = 0; i < sesonger.length; i++) {
        bilder.addObjects(this.get(sesonger[i] + 'bilder'));
      }

      bilder.addObjects(this.get('ukategoriserte'));
      this.set('bilder', bilder);
      return value;
    }
  }),

  ukategoriserte: Ember.computed('bilder.@each.er_ukategorisert', {
    get: function () {
      const bilder = this.get('bilder') || [];
      return bilder.filterBy('er_ukategorisert', true);
    }
  }),

  sommerbilder: Ember.computed('bilder.@each.er_sommerbilde', {
    get: function () {
      const bilder = this.get('bilder') || [];
      return bilder.filterBy('er_sommerbilde', true);
    }
  }),

  har_sommerbilder: Ember.computed('sommerbilder.[]', {
    get: function () {
      return this.get('sommerbilder.length') > 0;
    }
  }),

  vinterbilder: Ember.computed('bilder.@each.er_vinterbilde', {
    get: function () {
      const bilder = this.get('bilder') || [];
      return bilder.filterBy('er_vinterbilde', true);
    }
  }),

  har_vinterbilder: Ember.computed('vinterbilder.[]', {
    get: function () {
      return this.get('vinterbilder.length') > 0;
    }
  })

});
