import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

var Router = Ember.Router.extend(googlePageview, {
  location: config.locationType
});

Router.map(function () {
  this.route('cabins', {path: '/hytter', resetNamespace: true}, function () {
    this.route('edit', {path: '/:id'}, function () {
      this.route('photos', {path: '/bilder'}, function() {
        this.route('edit', {path: '/:photo_id'});
      });
    });

    this.route('new', {path: '/ny'});
  });

  this.route('cabins.dnt', {path: '/liste'});
  this.route('session.login', {path: '/logg-inn'});
  this.route('session.logout', {path: '/logg-ut'});
});

export default Router;
