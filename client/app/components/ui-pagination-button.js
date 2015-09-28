import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['item'],
  classNameBindings: ['page.isCurrent:active', 'disabled'],
  attributeBindings: ['disabled'],
  // the enabled property will easily toggle the disabled attribute for the element
  // in case there's no more items to iterate
  enabled: true,
  disabled: Ember.computed.not('enabled'),
  action: null,

  click: function () {
    if (this.get('enabled')) {
      this.sendAction('action', this.get('page.number'));
    }
  }

});
