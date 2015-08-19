import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: [],
  type: 'checkbox',

  typeof_checked: function () {
    var checked = this.get('attrs.checked');

    if (checked && checked.value) {

      if (checked.value instanceof Array) {
        return 'array';

      } else if (checked.value instanceof Object) {
        // TODO: Support for objects not implemented
        return 'object';

      } else if (typeof checked.value === 'boolean') {
        return 'boolean';

      } else if (checked.value instanceof String) {
        return 'string';

      } else {
        console.warn('Could not find checked typeof');
      }
    }

  }.property('checked'),

  should_be_checked: function () {
    var value = this.get('value');
    var checked = this.get('checked');
    var typeofChecked = this.get('typeof_checked');
    var shouldBeChecked;

    switch (typeofChecked) {
      case 'array':
        shouldBeChecked = (checked.indexOf(value) > -1);
        break;

      case 'object':
        // TODO: Not implemented
        console.error('Not implemented.');
        return;

      case 'boolean':
        shouldBeChecked = !!checked;
        break;

      case 'string':
        shouldBeChecked = (checked === value);
        break;

      default:
        break;
    }
    // console.log('should_be_checked:' + shouldBeChecked);
    return shouldBeChecked;

  }.property('checked'),

  setup: function () {

    // if this get action, do action when checkbox is clicked.
    // else, assume that it binds to value, and set to change value on change event

    this.$('.ui.checkbox').checkbox({
      onChange: Ember.run.bind(this, this.onChange)
    });

    if (this.get('should_be_checked')) {
      this.$('.ui.checkbox').checkbox('check');
    }

  }.on('didInsertElement'),

  updateUi: function () {
    // console.log('updateUi:start');
    var operation = this.get('should_be_checked') ? 'check' : 'uncheck';
    // console.log('updateUi:' + operation);
    this.$('.ui.checkbox').checkbox(operation);

  }.observes('should_be_checked'),

  setChecked: function () {
    var value = this.get('value');
    var checked = this.$('.ui.checkbox').checkbox('is checked');

    if (!this.get('attrs.checked')) {
      return;
    }

    if (this.get('attrs.checked').value instanceof Array) {
      if (checked) {
        this.get('checked').addObject(value);

      } else {
        this.get('checked').removeObject(value);
      }

    } else if (this.get('attrs.checked').value instanceof Object) {
      // Not implemented

    } else if (this.get('attrs.checked').value instanceof Boolean) {
      if (checked) {
        this.set('checked', true);

      } else {
        this.set('checked', false);
      }

    } else if (this.get('attrs.checked').value instanceof String) {
      if (checked) {
        this.set('checked', value);

      } else {
        this.set('checked', '');
      }

    } else {
        this.set('checked', value || checked);
    }

  },

  onChange: function () {
    var name = this.get('name');
    var value = this.get('value');
    var checked = this.$('.ui.checkbox').checkbox('is checked');
    var operation;

    if (this.type === 'radio') {
      var radioGroup = document.getElementsByName(this.get('name'));
      for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
          value = radioGroup[i].id;
        }
      }
    }

    if (this.get('attrs.action')) {
      this.sendAction('action', value);

    } else {
      this.setChecked();
    }

  }

});
