import DS from 'ember-data';

export default DS.Model.reopen({
  isExisting: Ember.computed('isNew', function () {
    return !this.get('isNew');
  })
});
