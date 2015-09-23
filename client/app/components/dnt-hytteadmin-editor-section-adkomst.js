import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleTilkomstKollektiv: function (value) {
      if (value) {
        this.set('tilkomst_kollektiv_enabled', true);

        if (typeof this.get('model.tilkomst.kollektiv') === 'undefined') {
          this.set('model.tilkomst.kollektiv', {
            'sommer': undefined,
            'vinter': undefined
          });
        }

      } else {
        this.set('model.tilkomst.kollektiv', undefined);
        this.set('tilkomst_kollektiv_enabled', false);
      }
    }
  }

});
