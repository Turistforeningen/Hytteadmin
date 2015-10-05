import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Component.extend({
  url: 'https://jotunheimr.app.dnt.no/api/v1/upload',
  paramName: 'image',

  files: [],

  isUploading: false,
  percent: null,

  actions: {
    addFilesToQueue: function (files) {
      for (let i = 0; i < files.length; i++) {
        this.get('files').addObject(Ember.Object.create({file: files[i], status: 'queued'}));
      }
    }
  },

  setup: function () {
    let input = this.$('input');
    input.hide();
    this.$('button').on('click', (e) => {
      input.click();
    });
  }.on('didInsertElement'),

  queue: Ember.computed('files.@each.status', {
    get: function () {
      return this.get('files').filterBy('status', 'queued');
    }
  }),

  filesChanged: function () {
    // Do not start upload if there are no files

    let files = this.get('files');
    if (files.get('length') === 0) {
      return;
    }

    // If already uploading file, do not start new upload
    let uploadingFile = files.findBy('status', 'uploading');
    if (uploadingFile) {
      return;
    }

    let nextFile = this.get('files').findBy('status', 'queued');

    if (nextFile) {
      nextFile.set('status', 'uploading');
      this.uploadFile(nextFile);

    } else {
      this.set('isUploading', false);
      this.set('files', []);
    }

  }.observes('files.[]', 'files.@each.status'),

  uploadFile: function (file) {
    let uploader = EmberUploader.Uploader.create({
      url: this.get('url'),
      paramName: this.get('paramName')
    });

    this.set('isUploading', true);

    uploader.upload(file.file);

    uploader.on('progress', (e) => {
      let overallPercent = e.percent/(this.get('queue.length') || 1);
      this.set('percent', overallPercent);
    });

    uploader.on('didUpload', (e) => {
      file.set('status', 'uploaded');
      this.didUpload(e);
    });
  },

  didUpload: function (data) {
    let photo = {img: data.versions};

    if (data.meta && data.meta.geojson) {
      photo.geojson = data.meta.geojson;
    }

    this.sendAction('createPhoto', photo);
  }

});
