/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {

  var app = new EmberApp(defaults, {
    // Any other options
    fingerprint: {
      exclude: ['ckeditor', 'semantic', 'leaflet'],
      ignore: ['ckeditor', 'semantic', 'leaflet']
    },
    minifyCSS: {
      enabled: false
    },
    minifyJS: {
      enabled: false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // app.import(app.bowerDirectory + '/semantic-ui/dist/semantic.js'); // Included as separate file in index.html
  // app.import(app.bowerDirectory + '/semantic-ui/dist/semantic.css'); // Included as separate file in index.html

  var ckeditor = new Funnel(app.bowerDirectory + '/ckeditor', {
     srcDir: '/',
     include: ['**/*.*'],
     destDir: '/assets/ckeditor'
  });

  var semanticUi = new Funnel(app.bowerDirectory + '/semantic-ui', {
     srcDir: '/dist',
     include: ['**/*.*'],
     destDir: '/assets/semantic-ui'
  });

  var leaflet = new Funnel(app.bowerDirectory + '/leaflet', {
     srcDir: '/dist',
     include: ['**/*.*'],
     destDir: '/assets/leaflet'
  });

  var Sortable = new Funnel(app.bowerDirectory + '/Sortable', {
     include: ['Sortable.js'],
     destDir: '/assets/sortable'
  });

  return app.toTree([semanticUi, leaflet, ckeditor, Sortable]);

};
