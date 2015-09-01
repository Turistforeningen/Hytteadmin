import Ember from 'ember';

export default Ember.Route.extend({

  activate: function () {
    // console.log('route:session:logout');
    var sessionController = this.controllerFor('session');
    sessionController.set('previousTransition', this.transitionTo('index'));
    this.controllerFor('session').send('logout');
  }

});
