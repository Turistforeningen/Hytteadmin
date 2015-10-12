import Ember from 'ember';

export default Ember.Component.extend({
  photo: null,

  classNames: ['dnt-photo-manager-list-item', 'column'],
  attributeBindings: ['photo.id:data-id'],
  isValid: null,

  initialize: function () {
    this.set('isValid', true);

  }.on('willInsertElement'),

  validationRules: null,

  actions: {
    save: function () {
      this.get('photo').save();
    },

    discardChanges: function () {
      this.get('photo').rollbackAttributes();
    },

    showModal: function () {
      this.$('.ui.modal').modal({
        transition: 'fade up',
        detachable: false
      }).modal('show');
    },

    deletePhoto: function (photo) {
      photo = photo || this.get('photo');
      this.sendAction('removePhoto', photo, false);
    },

    toggleDeleteMode: function () {
      this.set('deleteMode', !this.get('deleteMode'));
    }
  },

  updateValidationRules: function () {
    let validationRules = [
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

    this.set('validationRules', validationRules);

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
