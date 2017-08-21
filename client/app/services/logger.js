import Ember from 'ember';
import RavenLogger from 'ember-cli-sentry/services/raven';

const {computed} = Ember;

export default RavenLogger.extend({

  unhandledPromiseErrorMessage: '',

  captureException (error) {
    if (error && (error.message === 'Adapter operation failed')) {
      return false;
    }

    this._super(...arguments);
  },

  captureMessage (message) {
    // TODO: Had to add this to ignore aborted transitions which happens if user is not logged in
    // Have the feeling that this should be handeled somewhere else, just not sure where...
    var object = arguments[1];

    if (!message && object && object.extra && object.extra.reason && object.extra.reason.name === 'TransitionAborted') {
      return false;
    }

    return this._super(...arguments);
  },

  enableGlobalErrorCatching() {
    return this._super(...arguments);
  }
});
