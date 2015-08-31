import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setKontaktinfoGruppeById: function (id) {
      var model = this.get('model');
      if (typeof model.setKontaktinfoGruppeById) {
        model.setKontaktinfoGruppeById(id);
      }
    }
  }

});
