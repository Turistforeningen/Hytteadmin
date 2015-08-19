import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  pathForType: function(type) {
    return Ember.String.underscore(type);
  }

  // handleResponse: function(status, headers, payload) {
  //   if (this.isSuccess(status, headers, payload)) {
  //     return payload;
  //   } else if (this.isInvalid(status, headers, payload)) {
  //     return new InvalidError(payload.errors);
  //   }

  //   let errors = this.normalizeErrorResponse(status, headers, payload);

  //   return new AdapterError(errors);
  // },

  // parseErrorResponse: function (responseText) {
  //   var json = responseText;
  //   console.log('parseErrorResponse');
  //   try {
  //     json = Ember.$.parseJSON(responseText);
  //   } catch (e) {}

  //   return json;
  // },

  // normalizeErrorResponse: function (status, headers, payload) {
  //   console.log('normalizeErrorResponse');
  //   if (payload && typeof payload === "object" && payload.errors) {
  //     return payload.errors;

  //   } else {
  //     return [{
  //       status: "" + status,
  //       title: "The backend responded with an error",
  //       details: "" + payload.message
  //     }];
  //   }
  // }

});
