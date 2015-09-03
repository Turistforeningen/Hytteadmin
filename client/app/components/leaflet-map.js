/* globals L */
import Ember from 'ember';

export default Ember.Component.extend({

  center: null,
  marker: null,
  zoom: 13,

  bindAttributes: ['center', 'marker', 'zoom'],

  centerLatLng: Ember.computed('center', {
    get: function () {
      var center = this.get('center');
      if (center.type === 'Point') {
        // Assume center is a GeoJSON object with long & lat in coordinates array
        return L.latLng(center.coordinates[1], center.coordinates[0]);

      } else if (center.length === 2) {
        // Assume center is an array with lat & long
        return L.latLng(center[0], center[1]);
      }
    }
  }),

  setupMap: function () {

    this.mapLayers = this.createMapLayers();

    var mapOptions = {
      layers: [this.mapLayers.baseLayerConf['Topo 2']],
      scrollWheelZoom: false,
      center: this.get('centerLatLng'),
      zoom: this.get('zoom')
    };

    var view = this.$();
    this.map = L.map(view[0], mapOptions);

    this.initMarker();

  }.on('didInsertElement'),

  initMarker: function () {
    var markerPosition = this.get('marker');

    if (markerPosition) {
      var marker = L.marker(markerPosition);
      marker.addTo(this.map);
      this.set('_marker', marker);
    }
  },

  updateMarker: function () {
    var marker = this.get('_marker');

    if (marker) {
      marker.setLatLng(this.get('marker'));

    } else {
       this.initMarker();
    }

  }.observes('marker'),

  createMapLayers: function () {
    var topo, summer, winter, cabin, baseLayerConf, overlayConf;

    topo =  L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}', {
      maxZoom: 16,
      attribution: '<a href="http://www.statkart.no/">Statens kartverk</a>'
    });

    summer = L.tileLayer('http://mt3.turistforeningen.no/prod/trail_summer/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '<a href="http://www.turistforeningen.no/">DNT</a>'
    });

    winter = L.tileLayer('http://mt3.turistforeningen.no/prod/trail_winter/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '<a href="http://www.turistforeningen.no/">DNT</a>'
    });

    cabin = L.tileLayer('http://mt3.turistforeningen.no/prod/cabin/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '<a href="http://www.turistforeningen.no/">DNT</a>'
    });

    baseLayerConf = {'Topo 2': topo};
    overlayConf = {
      'DNTs merkede stier': summer,
      'DNTs merkede vinterruter': winter,
      'DNTs turisthytter': cabin
    };

    return {
      baseLayerConf: baseLayerConf,
      overlayConf: overlayConf
    };
  },

  setupLayerControls: function () {
    // Add layer controls for selecting visible layers
    L.control.layers(this.mapLayers.baseLayerConf, this.mapLayers.overlayConf, {
      position: 'topleft'
    }).addTo(this.map);
  }
});
