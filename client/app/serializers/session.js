import DS from 'ember-data';

import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  // NOTE: Depends on DS.EmbeddedRecordsMixin
  attrs: {
    gruppe: {embedded: 'always'},
    grupper: {embedded: 'always'}
  },

  normalizeSingleResponse: function (store, primaryModelClass, payload, id, requestType) {
    var normalizedPayload = payload || {};

    // NOTE: Sessions objects usually don't have an ID. Use user email if that's the case
    if (!normalizedPayload._id) {
      normalizedPayload._id = normalizedPayload.epost;
    }

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },

  normalizeArrayResponse: function (store, primaryModelClass, payload, id, requestType) {
    // NOTE: Sessions objects usually don't have an ID. Use user email if that's the case
    if (!payload._id) {
      payload._id = payload.epost;
    }

    // Return object formatted like a response from Turbasen
    var normalizedPayload = {documents: [payload]};

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  }
});
