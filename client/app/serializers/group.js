import DS from 'ember-data';

import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({

  normalize: function (modelClass, resourceHash, prop) {
    var normalizedHash = resourceHash;

    if (!normalizedHash._id && resourceHash.object_id) {
      normalizedHash._id = resourceHash.object_id;
    }

    if (resourceHash.kontaktinfo) {
      for (var i = 0; i < resourceHash.kontaktinfo.length; i++) {
        resourceHash.kontaktinfo[i]['type'] = resourceHash.kontaktinfo[i]['tittel'];
        delete resourceHash.kontaktinfo[i]['tittel'];
      }
    }

    return this._super(modelClass, normalizedHash, prop);
  },

  serialize: function(snapshot, options) {
    var json = this._super(snapshot, options);

    // Rename kontaktinfo object property `type` back to `tittel`
    if (json.kontaktinfo) {
      for (var i = 0; i < json.kontaktinfo.length; i++) {
        json.kontaktinfo[i]['tittel'] = json.kontaktinfo[i]['type'];
        delete json.json[i]['type'];
      }
    }

    return json;
  }

});
