import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('cabins', {path: '/hytter', resetNamespace: true}, function () {
    this.route('edit', {path: '/:id'});
  });

  this.route('session.login', {path: '/logg-inn'});
  this.route('session.logout', {path: '/logg-ut'});
});

export default Router;
