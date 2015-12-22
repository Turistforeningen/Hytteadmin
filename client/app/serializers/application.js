import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  // http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_opt-into-the-new-serializer-api
  isNewSerializerAPI: true,

  primaryKey: '_id',

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },

  keyForRelationship: function(key) {
    return Ember.String.underscore(key);
  },

  removeEmpty: function (input) {
    let output = Ember.copy(input);
    let type = Ember.typeOf(input);

    if (type === 'array') {
      for (let i = 0; i < output.length; i++) {
        if (Ember.typeOf(output[i]) === 'object') {
          if (Object.keys(output[i]).length === 0) {
            output.splice(i, 1);
          } else if (output[i].url === 'http://') {
            output.splice(i, 1);
          } else {
            output[i] = this.removeEmpty(output[i]);
          }

        } else if (Ember.typeOf(output[i]) === 'string') {
          if (output[i] === '') {
            output.splice(i, 1);
          }
        }
      }

    } else if (type === 'object') {
      for (let prop in output) {
        let type = Ember.typeOf(output[prop]);
        if (type === 'object') {
          if (prop === 'geojson') {
            if (!output[prop].coordinates || output[prop].coordinates.length === 0) {
              delete output[prop];
            }

          } else {
            output[prop] = this.removeEmpty(output[prop]);
          }

        } else if (type === 'array') {
          output[prop] = this.removeEmpty(output[prop]);
          if (output[prop].length === 0) {
            delete output[prop];
          }

        } else if (type === 'null') {
          delete output[prop];

        } else if (type === 'string') {
          if (output[prop] === '') {
            delete output[prop];
          }
        }
      }
    }

    return output;
  },

  serialize: function (snapshot, options) {
    var json = this._super(snapshot, options);

    // Remove all empty properties. If API is changed back to using PATCH for saving, this should be disabled
    json.attributes = this.removeEmpty(json.attributes);

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

    if (id) {
      normalizedPayload[primaryModelClass.modelName]['_id'] = id;
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

    // Include count & total in a meta object as convention says
    if (payload.count && payload.total) {
      normalizedPayload.meta = {
        count: payload.count,
        total: payload.total
      };
    }

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },

  normalize: function (modelClass, resourceHash, prop) {
    var normalizedHash = resourceHash.document || resourceHash || {};
    return this._super(modelClass, normalizedHash, prop);
  },

  extractErrors: function (store, typeClass, payload, id) {
    var extractedPayload = {};

    if (payload && payload.errors) {
      payload.errors.forEach((error, index, list) => {
        extractedPayload[error.context.key] = [error.message];
      });

    } else if (payload && typeof payload === 'object' && payload.message) {
      payload = [payload.message];
      this.normalizeErrors(typeClass, payload);
    }
    return extractedPayload;
  }

  // extractErrors: function(store, typeClass, payload, id) {
  //   if (payload && typeof payload === 'object' && payload.errors) {
  //     payload = errorsArrayToHash(payload.errors);
  //     this.normalizeErrors(typeClass, payload);
  //   }

  //   return payload;
  // }
});
