import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('cabins', {path: '/hytter'}, function () {
    this.route('edit', {path: '/:id'});
  });
});

export default Router;
