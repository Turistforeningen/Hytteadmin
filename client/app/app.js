import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

// NOTE: Any custom overrides will have to be imported here
import TextArea from './overrides/ember-textarea';
import TextField from './overrides/ember-textfield';
import Model from './overrides/ds-model';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

loadInitializers(App, config.modulePrefix);

export default App;
