module.exports.conf = {
  API_KEY: process.env.NTB_API_KEY,
  API_ENV: process.env.NTB_API_ENV || 'api',
  USER_AGENT: process.env.NTB_USER_AGENT || 'turbasen.js/1.0'
};

function requestDefaults() {
  return require('request').defaults({
    baseUrl: 'http://' + module.exports.conf.API_ENV + '.nasjonalturbase.no/',
    headers: {
      'user-agent': module.exports.conf.USER_AGENT
    },
    json: true,
    qs: {
      api_key: module.exports.conf.API_KEY
    }
  })
};

var request = requestDefaults();

[
  'grupper',
  'bilder',
  'steder',
  'turer',
  'områder',
  'aktiviteter'
].forEach(function(type) {
  module.exports[type] = function(params, callback) {
    if (!callback) { return request.get({url: type, qs: params}); }
    request.get({url: type, qs: params}, callback);
  };

  module.exports[type].post = function(data, callback) {
    if (!callback) { return request.post({url: type, body: data}); }
    request.post({url: type, body: data}, callback);
  };

  module.exports[type].get = function(id, callback) {
    if (!callback) { return request.get({url: type + '/' + id}); }
    request.get({url: type + '/' + id}, callback);
  };

  module.exports[type].put = function(id, data, callback) {
    if (!callback) { return request.put({url: type + '/' + id, body: data}); }
    request.put({url: type + '/' + id, body: data}, callback);
  };

  module.exports[type].patch = function(id, data, callback) {
    if (!callback) { return request.patch({url: type + '/' + id, body: data}); }
    request.patch({url: type + '/' + id, body: data}, callback);
  };
});

module.exports.configure = function(obj) {
  for (key in obj) {
    module.exports.conf[key] = obj[key];
  }

  // Generate a new request object
  request = requestDefaults();
};
