import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function () {

      var loginData = {
        email: this.get('email'),
        password: this.get('password')
      };

      var transition = this.get('previousTransition') || this.transitionToRoute('index');
      this.set('previousTransition', null);

      Ember.$.post('/auth/login/turbasen', loginData).then((response) => {
        transition.retry();

      }, function (error) {
        if (error.status === 401) {
          console.error('Wrong user or password, please try again');
        }
      });
    },

    logout: function () {
      console.log('controller:session:logout');
      Ember.$.post('/auth/logout').then((response) => {
        this.transitionToRoute('index');

      }, function(error) {
        console.error('There was an error logging out o_O');
      });
    }

  }

});
