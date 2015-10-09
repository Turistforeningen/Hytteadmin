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
        identifier: this.get('tittelPath'),
        rules: [
          {
            type: 'empty',
            prompt: 'Lenken må ha en tittel'
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

  tittelPath: Ember.computed('index', {
    get: function () {
      return ['lenker', this.get('index'), 'tittel'].join('-');
    }
  }),

  urlPath: Ember.computed('index', {
    get: function () {
      return ['lenker', this.get('index'), 'url'].join('-');
    }
  })

});
