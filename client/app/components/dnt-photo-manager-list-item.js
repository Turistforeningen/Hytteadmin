import Ember from 'ember';

export default Ember.Component.extend({
  photo: null,

  classNames: ['dnt-photo-manager-list-item', 'item'],
  attributeBindings: ['photo.id:data-id'],

  validationRules: [],

  actions: {
    save: function () {
      this.get('photo').save();
    }
  },

  updateValidationRules: function () {
    let newRules = [
      {
        identifier: this.get('beskrivelsePath'),
        rules: [
          {
            type: 'empty',
            prompt: 'Bildet må ha en beskrivelse'
          }
        ]
      },
      {
        identifier: this.get('fotografEpostPath'),
        rules: [
          {
            type: 'email',
            prompt: 'Må være en gyldig epostadresse'
          }
        ]
      }
    ];

    this.get('validationRules').addObjects(newRules);

  }.on('didInsertElement'),

  beskrivelsePath: Ember.computed('photo.id', {
    get: function () {
      return ['bilder', this.get('photo.id'), 'beskrivelse'].join('-');
    }
  }),

  fotografEpostPath: Ember.computed('photo.id', {
    get: function () {
      return ['bilder', this.get('photo.id'), 'fotograf', 'epost'].join('-');
    }
  })
});
