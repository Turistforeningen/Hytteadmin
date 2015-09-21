import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setKontaktinfoGruppeById: function (id) {
      var model = this.get('model');
      if (Ember.typeOf(model.setKontaktinfoGruppeById) === 'function') {
        model.setKontaktinfoGruppeById(id);
      }
    }
  }

});
