import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  // http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_opt-into-the-new-serializer-api
  isNewSerializerAPI: true,

  serialize: function(snapshot, options) {
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
  serializeIntoHash: function(hash, type, record, options) {
    // console.log('serializeIntoHash', type, record, options);
    Ember.merge(hash, this.serialize(record, options));
  },

  normalizeSingleResponse: function (store, primaryModelClass, payload, id, requestType) {

    var normalizedPayload = {};

    if (payload.document) {
      normalizedPayload[primaryModelClass.modelName] = payload.document;

    } else {
      normalizedPayload[primaryModelClass.modelName] = payload;
    }

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },


  normalizeArrayResponse: function (store, primaryModelClass, payload, id, requestType) {

    var normalizedPayload = {};

    normalizedPayload[primaryModelClass.modelName] = payload.documents;

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },

 // normalize: function(modelClass, resourceHash, prop) {
 //    if (this.normalizeHash && this.normalizeHash[prop]) {
 //      this.normalizeHash[prop](resourceHash);
 //    }
 //    return this._super(modelClass, resourceHash, prop);
 //  },

  normalize: function(type, hash, property) {
    // console.log('normalize');
    // normalize the `_id`
    var json = {};
    if (hash._id) {
      json.id = hash._id;
      delete hash._id;
    }

    var raw = hash;

    if (hash.document) {
      raw = hash.document;
    }

    // normalize the underscored properties
    for (var prop in raw) {
      json[prop.camelize()] = raw[prop];
    }

    // delegate to any type-specific normalizations
    return this._super(type, json, property);
  },

  extractErrors: function(store, typeClass, payload, id) {
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
