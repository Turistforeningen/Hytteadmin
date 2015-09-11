import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'sticky'],
  classNameBindings: ['position'],

  contextSelector: null,
  offset: null,
  position: null,
  attributeBindings: ['contextSelector', 'offset', 'position'],

  setup: function () {
    let options = {};

    let contextSelector = this.get('contextSelector');
    if (contextSelector) { options.context = this.get('contextSelector'); }

    let offset = parseInt(this.get('offset'), 10);
    if (offset) { options.offset = offset; }

    this.$().sticky(options);

  }.on('didInsertElement')
});
