import Ember from 'ember';

export default Ember.TextField.reopen({
  attributeBindings: ['data-validate'],

  forceNumber: Ember.observer('value', function () {
    let value = this.get('value');
    let type = this.get('type');

    if (type  === 'number' && Ember.typeOf(value) !== 'number') {
      this.set('value', Number(value));
    }
  })

});
