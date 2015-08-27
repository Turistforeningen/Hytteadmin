import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  // http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_opt-into-the-new-serializer-api
  isNewSerializerAPI: true,

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },

  keyForRelationship: function(key) {
    return Ember.String.underscore(key);
  },

  serialize: function (snapshot, options) {
    var json = this._super(snapshot, options);
    // console.log('serialize', json);
    for (var prop in json.attributes) {
      if (json.attributes[prop] === undefined || json.attributes[prop] === null) {
        delete json.attributes[prop];
      }
    }

    // NOTE: This will add the relationships to JSON object... Should probably be done in a better way
    for (var json_prop in json) {
      if (json_prop !== 'attributes') {
        json.attributes[json_prop] = json[json_prop];
      }
    }

    return json.attributes;
  },

  serializeAttribute: function(snapshot, json, key, attributes) {
    json.attributes = json.attributes || {};
    this._super(snapshot, json.attributes, key, attributes);
  },

  serializeIntoHash: function (hash, type, record, options) {
    // console.log('serializeIntoHash', type, record, options);
    Ember.merge(hash, this.serialize(record, options));
  },

  // extractSingle: function(store, type, payload, id) {
  //   var payloadExtract = {};

  //   if (payload.document) {
  //     payloadExtract[type['modelName']] = payload.document;

  //   } else {
  //     payloadExtract[type['modelName']] = payload;
  //   }

  //   return this._super(store, type, payloadExtract, id);
  // },

  normalizeSingleResponse: function (store, primaryModelClass, payload, id, requestType) {
    var normalizedPayload = {};

    if (payload.document) {
      normalizedPayload[primaryModelClass.modelName] = payload.document;

    } else {
      normalizedPayload[primaryModelClass.modelName] = payload;
    }

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },

  // extractArray: function(store, type, payload) {
  //   // console.log('extractArray');
  //   var payloadExtract = {};
  //   payloadExtract[type['modelName']] = payload.documents;
  //   return this._super(store, type, payloadExtract);
  // },

  normalizeArrayResponse: function (store, primaryModelClass, payload, id, requestType) {
    var normalizedPayload = {};

    normalizedPayload[primaryModelClass.modelName] = payload.documents;

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },

  normalize: function (modelClass, resourceHash, prop) {
    var normalizedHash = resourceHash.document || resourceHash || {};

    // Normalize the `_id` to `id`
    if (normalizedHash._id) {
      normalizedHash.id = normalizedHash._id;
      delete normalizedHash._id;
    }

    return this._super(modelClass, normalizedHash, prop);
  },

  extractErrors: function (store, typeClass, payload, id) {
    if (payload && typeof payload === 'object' && payload.message) {
      payload = [payload.message];
      this.normalizeErrors(typeClass, payload);
    }
    return payload;
  }

  // extractErrors: function(store, typeClass, payload, id) {
  //   if (payload && typeof payload === 'object' && payload.errors) {
  //     payload = errorsArrayToHash(payload.errors);
  //     this.normalizeErrors(typeClass, payload);
  //   }

  //   return payload;
  // }
});
