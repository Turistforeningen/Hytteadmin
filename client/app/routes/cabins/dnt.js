import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabin',

  model: function (params) {
    var results = [];
    var fields = [
      '_id',
      'betjeningsgrad',
      'byggeår',
      'fasiliteter',
      'fylke',
      'geojson',
      'grupper',
      'kart',
      'kontaktinfo',
      'navn',
      'områder',
      'privat', // hytteeier, hyttetype, senger, åpningstider,
      'tags',
      'tilrettelagt_for',
      'turkart'
    ].join(',');

    var params = {
      limit: 100,
      fields: fields,
      'privat.hytteeier': 'DNT',
      status: 'Offentlig'
    };

    return this.store.query('cabin', params)
      .then(res => {
        var total = res.meta.total;
        var remaining = total - res.meta.count;
        var reqCount = Math.ceil(remaining / 100);

        var arr = [];

        for (var i = 0; i < reqCount; i++) {
          arr.push(
            this.store.query('cabin', {
              limit: 100,
              skip: (i + 1) * 100,
              fields: fields,
              'privat.hytteeier': 'DNT'
            })
          );
        }

        return Promise.all(arr).then((all) => {
          all.forEach((item) => {
            Ember.set(res, 'content', res.content.concat(item.content));
          })

          return res;
        });

        return res;
      });
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function () {
    this.render('cabins/dnt');

    this.render('cabins/header-left', {
      into: 'application',
      outlet: 'header-left'
    });
  },

  actions: {
    export: function () {
      var model = this.controller.get('model');
      var arr = model.toArray();

      var lines = [
        'sep=,',
        [
          'Navn',
          'Betjeningsgrad',
          'Områder',
          'Eier',
          '"Posisjon (lat, lng)"'
        ].join(',')
      ].concat(arr.map(cabin => {
        return [
          '"' + cabin.get('navn'),
          cabin.get('betjeningsgrad'),
          (cabin.get('områder') || []).mapBy('navn').join(', '),
          cabin.get('juridisk_eier.navn'),
          cabin.get('geojson.coordinates.1') + ', ' + cabin.get('geojson.coordinates.0') + '"'
        ].join('","');
      }));

      var csv = lines.join('\r\n');
      download(csv, 'dnt-hytter.csv', 'text/csv');
    }
  }
});
