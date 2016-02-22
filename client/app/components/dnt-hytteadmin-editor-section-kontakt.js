import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setKontaktinfoGruppeById: function (id) {
      var model = this.get('model');
      if (Ember.typeOf(model.setKontaktinfoGruppeById) === 'function') {
        model.setKontaktinfoGruppeById(id);
      }
    }
  },

  init: function (e) {
    this._super(...arguments);
    const kontaktinfoGruppeId = this.get('model.kontaktinfo_gruppe.gruppe_id');

    if (kontaktinfoGruppeId) {
      this.send('setKontaktinfoGruppeById', kontaktinfoGruppeId);
    }
  }

});
