import DS from 'ember-data';

// import ApplicationAdapter from './application';

// export default ApplicationAdapter.extend({
export default DS.RESTAdapter.extend({
  namespace: 'auth',
  pathForType: function () {
    return '';
  }
});
