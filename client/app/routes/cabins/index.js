import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'cabins',

  // offset: 0,
  // limit: 20,
  /*
   *queryParams: {
   *  page: {
   *    refreshModel: true
   *  },
   *  juridisk_eier: {
   *    refreshModel: true
   *  },
   *  vedlikeholdes_av: {
   *    refreshModel: true
   *  }
   *},
   */

  model: function (params) {
/*
 *    let page;
 *    if (params.page) {
 *      page = params.page;
 *      // avoid page numbers to be trolled i.e.: page=string, page=-1, page=1.23
 *      page = isNaN(page) ? 1 : Math.floor(Math.abs(page));
 *      // page=1 will result into offset 0, page=2 will result into offset 10 and so on
 *      this.set('offset', (page-1)*this.get('limit'));
 *    }
 *
 *    if (params.vedlikeholdes_av) {
 *      params['privat.vedlikeholdes_av'] = params.vedlikeholdes_av;
 *      delete params.vedlikeholdes_av;
 *    }
 *
 *    if (params.juridisk_eier) {
 *      params['privat.juridisk_eier'] = params.juridisk_eier;
 *      delete params.juridisk_eier;
 *    }
 *
 *    return this.store.query('cabin', params);//, {
 */
      //skip: this.get('offset'),
      //limit: this.get('limit'),
      //juridisk_eier: this.get('juridisk_eier'),
      //vedlikeholdes_av: this.get('vedlikeholdes_av')
    //});
  },

  afterModel: function (cabins, transition) {
    document.title = `Hytter – ${document.title}`;
  },

  setupController: function (controller, model, transition) {
    controller.set('model', model);

    let queryParamJuridiskEier = transition.queryParams.juridisk_eier;
    let queryParamVedlikeholdesAv = transition.queryParams.vedlikeholdes_av;
    let queryParamsNavn = transition.queryParams.navn;

    if (queryParamJuridiskEier) {
      controller.set('juridisk_eier', queryParamJuridiskEier);

    } else if (queryParamVedlikeholdesAv) {
      controller.set('vedlikeholdes_av', queryParamVedlikeholdesAv);

    } else if (this.controllerFor('session').get('model.er_admin')) {
      // We want admins to get list of all cabins by default
      controller.set('filterParamsObject', {});

    } else {
      let primærgruppe = this.controllerFor('session').get('model.primærgruppe');

      if (primærgruppe) {
        let primærgruppeJson = Ember.copy(primærgruppe.toJSON({
          includeId: true
        }));

        controller.set('filterParamsObject', {
          relation: 'vedlikeholdes_av',
          gruppe: {
            id: primærgruppeJson.id,
            navn: primærgruppeJson.navn
          }
        });
      }
    }

    if (queryParamsNavn) {
      this.controller.set('navn', queryParamsNavn);
    }

  },

  renderTemplate: function () {
    this.render('cabins/list');

    this.render('cabins/header-left', {
      into: 'application',
      outlet: 'header-left'
    });
  }
});
