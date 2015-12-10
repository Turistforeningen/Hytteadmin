import Ember from 'ember';

export default Ember.Component.extend({
  hasError: false,
  validationRules: null,

  actions: {
    saveAndClose: function () {
      this.get('photo').save().then((photo) => {
        this.send('close');
      }, (err) => {
        this.set('hasError', true);
      });
    },

    revertChangesAndClose: function () {
      this.send('close');
      Ember.run.next(this, function () {
        this.get('photo').rollbackAttributes();
      });
    },

    close: function () {
      this.$('.ui.modal').modal('hide');
    },

    removePhoto: function () {
      this.send('close');
      Ember.run.next(this, function () {
        let photo = this.get('photo');
        this.sendAction('removePhoto', photo);
      });
    },

    deletePhoto: function () {
    }
  },

  setup: Ember.on('didInsertElement', function () {
    this.$('.ui.modal').modal({
      transition: 'fade up',
      detachable: false,
      onHidden: Ember.run.bind(this, this.onHide)
    }).modal('show');
  }),

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
        optional: true,
        rules: [
          {
            type: 'email',
            prompt: 'Må være en gyldig epostadresse hvis utfylt'
          }
        ]
      },
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
  }),

  onHide: function () {
    this.sendAction('onClose');
  }

});
