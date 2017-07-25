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

    return this.store.query('cabin', {limit: 100, fields: fields, 'privat.hytteeier': 'DNT'})
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
    this.render('cabins/export');

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
          'Byggeår',
          'Fasiliteter',
          'Fylke',
          'Kart',
          'Turkart',
          'Hyttetype',
          'Senger betjent',
          'Senger ekstra',
          'Senger selvbetjent',
          'Senger ubetjent',
          'Senger vinter',
          'Tilrettelagt for',
          'Tags',
          'Id i Turbasen'
        ].join(',')
      ].concat(arr.map(cabin => {
        return [
          '"' + cabin.get('navn'),
          cabin.get('betjeningsgrad'),
          cabin.get('byggeår'),
          cabin.get('fasiliteter').mapBy('type').join(', '),
          cabin.get('fylke'),
          cabin.get('kart'),
          (cabin.get('turkart') || []).mapBy('navn').join(', '),
          cabin.get('privat.hyttetype'),
          cabin.get('privat.senger.betjent'),
          cabin.get('privat.senger.ekstra'),
          cabin.get('privat.senger.selvbetjent'),
          cabin.get('privat.senger.ubetjent'),
          cabin.get('privat.senger.vinter'),
          (cabin.get('tilrettelegginger') || []).mapBy('type').join(', '),
          (cabin.get('tags') || []).join(', '),
          cabin.get('id') + '"'
        ].join('","');
      }));

      var csv = lines.join('\r\n');
      download(csv, 'dnt-hytter.csv', 'text/csv');
    }
  }
});
