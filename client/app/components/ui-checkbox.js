import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: [],
  type: 'checkbox',

  setup: function () {

    // if this get action, do action when checkbox is clicked.
    // else, assume that it binds to value, and set to change value on change event

    this.$('.ui.checkbox').checkbox({
      onChange: Ember.run.bind(this, this.onChange)
    });

  }.on('didInsertElement'),

  onChange: function () {
    var value;

    if (this.type === 'radio') {
      var radioGroup = document.getElementsByName(this.get('name'));
      for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
          value = radioGroup[i].id;
        }
      }
    }

    if (this.get('action')) {
      this.sendAction('action', value);

    } else {
      this.set('value', value);
    }

  }

});
