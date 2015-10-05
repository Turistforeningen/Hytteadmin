import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  multiple: false,

  filesDidChange: function (files) {
    this.sendAction('onFilesChange', files);
  }

});

