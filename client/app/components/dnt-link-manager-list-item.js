import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['top aligned'],

  index: null,
  link: null,
  validationRules: null,
  bindAttributes: ['index', 'link', 'validationRules'],

  actions: {
    removeLink: function (link) {
      this.sendAction('removeLink', link);
    }
  },

  updateValidationRules: function () {
    let newRules = [
      {
        identifier: this.get('typePath'),
        rules: [
          {
            type: 'empty',
            prompt: 'Lenken må ha en type'
          }
        ]
      },
      {
        identifier: this.get('urlPath'),
        rules: [
          {
            type: 'url',
            prompt: 'Lenken må ha en gyldig nettadresse'
          }
        ]
      }
    ];

    this.get('validationRules').addObjects(newRules);

  }.on('didInsertElement'),

  typePath: Ember.computed('index', {
    get: function () {
      return ['lenker', this.get('index'), 'type'].join('-');
    }
  }),

  urlPath: Ember.computed('index', {
    get: function () {
      return ['lenker', this.get('index'), 'url'].join('-');
    }
  }),

  tittelEnabled: Ember.computed('link.type', {
    get: function () {
      return this.get('link.type') === 'Annen';
    }
  }),

  unsetTittel: Ember.observer('tittelEnabled', function () {
    if (this.get('tittelEnabled') === false) {
      this.set('link.tittel');
    }
  })

});
