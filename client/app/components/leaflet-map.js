import Ember from 'ember';

export default Ember.Component.extend({

  setupMap: function () {

    this.mapLayers = this.createMapLayers();

    var mapOptions = {
      layers: [this.mapLayers.baseLayerConf['Topo 2']],
      scrollWheelZoom: false,
      center: this.mapCenter,
      zoom: this.mapZoom
    };

    var view = this.$();
    this.map = L.map(view[0], mapOptions);

    // // Add layer controls for selecting layer to map
    // L.control.layers(this.mapLayers.baseLayerConf, this.mapLayers.overlayConf, {
    //   position: 'topleft'
    // }).addTo(this.map);

  }.on('didInsertElement'),

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
});
