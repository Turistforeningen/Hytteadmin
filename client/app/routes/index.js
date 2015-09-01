import Ember from 'ember';

export default Ember.Route.extend({
  activate: function () {
    // Nothing on index page. Go straight to cabins.index
    this.transitionTo('cabins.index');
  }
});
