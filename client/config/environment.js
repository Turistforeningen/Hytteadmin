/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hytteadmin-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' hytte.app.dnt.privat:49152 hytte.app.dnt.privat use.typekit.net connect.facebook.net maps.googleapis.com maps.gstatic.com cdn.ravenjs.com",
      'font-src': "'self' data: use.typekit.net fonts.gstatic.com",
      'connect-src': "'self' ws://hytte.app.dnt.privat:49152 ws.geonorge.no",
      'img-src': "'self' data: www.facebook.com p.typekit.net www.dnt.no www.turistforeningen.no www2.turistforeningen.no s3-eu-west-1.amazonaws.com  mt3.turistforeningen.no opencache.statkart.no app.getsentry.com sentry.app.dnt.no",
      'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com",
      'frame-src': "s-static.ak.facebook.com static.ak.facebook.com www.facebook.com"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    sentry: {
      skipCdn: false, // Skip loading from CDN
      cdn: '//cdn.ravenjs.com',
      dsn: 'https://1d5112a03f0941278212feeea3a98c75@sentry.app.dnt.no/16',
      version: '1.1.19',
      whitelistUrls: [/hytte\.app\.dnt\.no/], // Use regex if only setting domain
      development: false // Set to true, to disable while developing
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-45821478-3'
    };
  }

  return ENV;
};
