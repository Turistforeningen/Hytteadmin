import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: 'https://jotunheimr.app.dnt.no/api/v1/upload',
  multiple: true,
  paramName: 'image',
  paramNamespace: 'image',
  percent: null,

  filesDidChange: function (files) {
    var uploader = EmberUploader.Uploader.create({
      url: this.get('url'),
      paramName: this.get('paramName')
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);

      uploader.on('progress', (e) => {
        this.set('percent', e.percent);
      });

      uploader.on('didUpload', (e) => {
        this.sendAction('didUpload', e);
      });
    }
  }
});

