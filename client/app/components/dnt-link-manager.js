import Ember from 'ember';

export default Ember.Component.extend({

  TYPE_CHOICES: [
    'Pris',
    'Facebook',
    'Yr',
    'Twitter',
    'Instagram',
    'Hjemmeside',
    'Booking',
    'Kontaktinfo',
    'Annen'
  ],

  actions: {
    addLink: function () {
      this.get('links').addObject({tittel: '', type: '', url: 'http://'});
    },
    removeLink: function (link) {
      this.get('links').removeObject(link);
    }
  },

  setupLinks: function () {
    var links = this.get('links');
    this.set('links', Ember.ArrayProxy.create({content: Ember.A(links)}));
  }.on('init')

});
