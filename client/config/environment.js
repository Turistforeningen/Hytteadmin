/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hytteadmin-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        '\'unsafe-eval\'',
        'turistforeningen.atlassian.net',
        'dev.app.dnt.local:49152',
        'hytte.app.dnt.local:49152',
        'hytte.app.dnt.local',
        'dev.app.dnt.no',
        'use.typekit.net',
        'connect.facebook.net',
        'maps.googleapis.com',
        'maps.gstatic.com',
        'cdn.ravenjs.com',
        'widget.uservoice.com',
        'by.uservoice.com',
        'by2.uservoice.com'
      ].join(' '),
      'font-src': [
        '\'self\'',
        'data:',
        'use.typekit.net',
        'fonts.gstatic.com',
        's3-eu-west-1.amazonaws.com'
      ].join(' '),
      'connect-src': [
        '\'self\'',
        'ws://dev.app.dnt.local:49152',
        'ws://hytte.app.dnt.local:49152',
        'ws.geonorge.no',
        'jotunheimr.app.dnt.no',
        'geoserver.app.dnt.no'
      ].join(' '),
      'img-src': [
        '\'self\'',
        'data:',
        'www.google-analytics.com',
        'www.facebook.com',
        'p.typekit.net',
        'www.dnt.no',
        'www.turistforeningen.no',
        'www2.turistforeningen.no',
        's3-eu-west-1.amazonaws.com',
        'mt3.turistforeningen.no',
        'opencache.statkart.no',
        'app.getsentry.com',
        'sentry.app.dnt.no',
        'widget.uservoice.com'
      ].join(' '),
      'style-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'use.typekit.net',
        'fonts.googleapis.com',
        's3-eu-west-1.amazonaws.com'
      ].join(' '),
      'frame-src': [
        's-static.ak.facebook.com',
        'static.ak.facebook.com',
        'www.facebook.com',
        'dnt.uservoice.com'
      ].join(' ')
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
    moment: {
      includeLocales: ['nb']
    },
    sentry: {
      skipCdn: false, // Skip loading from CDN
      cdn: '//cdn.ravenjs.com/1.1.22/raven.min.js',
      dsn: process.env.SENTRY_DSN,
      whitelistUrls: [/hytte\.app\.dnt\.no/], // Use regex if only setting domain
      serviceName: 'logger', // https://github.com/damiencaselli/ember-cli-sentry/wiki/Migration-from-1.x.x-to-2.x
      development: false,
      ignoreErrors: [/TransitionAborted/]
    }
  };

  if (environment === 'development') {
    ENV.sentry.development = true; // Set to true, to disable while developing
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
