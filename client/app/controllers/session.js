import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: false,
  loginAttempted: false,

  actions: {

    validate: function () {
      // console.log('controller:session:validate');
      var transition = this.get('previousTransition') || this.transitionToRoute('index');
      this.set('previousTransition', null);

      if (this.get('isAuthenticated') === true) {
        // Is already logged in

      } else if (transition.intent.name === 'session.login') {
        // Trying to reach login page through Ember link

      } else if (transition.intent.url === '/logg-inn') {
        // Trying to reach login page through URL

      } else if (transition.intent.name === 'session.logout') {
        // Allow logging out

      } else {
        // Need to validate session server side before continuing
        transition.abort();

        var session = this.store.findAll('session').then((sessions) => {
          this.set('isAuthenticated', true);
          transition.retry();

        }).catch((err) => {
          console.error(err);
          this.transitionToRoute('session.login');
        });
      }
    },

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
        this.set('isAuthenticated', false);
        this.transitionToRoute('session.login');

      }, function(error) {
        console.error('There was an error logging out o_O');
      });
    }

  }

});
