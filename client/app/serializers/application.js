import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({

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

  extractSingle: function(store, type, payload, id) {
    // {
    //   data: {
    //     id: '1',
    //     type: 'user',
    //     attributes: {
    //       name: 'wecc'
    //     },
    //     relationships: {
    //       accounts: {
    //         data: [
    //           { id: '1', type: 'account' },
    //           { id: '2', type: 'account' }
    //         ]
    //       }
    //     }
    //   },
    //   included: [{
    //     id: '1',
    //     type: 'account',
    //     attributes: {
    //       email: 'wecc@sweden.se'
    //     }
    //   }, {
    //     id: '2',
    //     type: 'account',
    //     attributes: {
    //       email: 'wecc@greece.gr'
    //     }
    //   }]
    // }
    // console.log('extractSingle');
    var payloadExtract = {};
    if (payload.document) {
      payloadExtract[type['modelName']] = payload.document;

    } else {
      payloadExtract[type['modelName']] = payload;

    }
    // NOTE: Superhackish. Should get this in normalize. Ideally included in response from API
    // NOTE: Think this is solved in the API now
    // if (id) {
    //   payloadExtract[type['modelName']]['id'] = id;
    // }
    return this._super(store, type, payloadExtract, id);
  },

  extractArray: function(store, type, payload) {
    // console.log('extractArray');
    var payloadExtract = {};
    payloadExtract[type['modelName']] = payload.documents;
    return this._super(store, type, payloadExtract);
  },

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
