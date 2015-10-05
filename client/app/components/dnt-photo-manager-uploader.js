import Ember from 'ember';

export default Ember.Component.extend({
  isUploading: false,
  percent: null,

  actions: {
    createPhoto: function (data) {
      // console.log('component:dnt-photo-manager-uploader:actions:createPhoto');
      let photo = {img: data.versions};

      if (data.meta && data.meta.geojson) {
        photo.geojson = data.meta.geojson;
      }

      this.sendAction('createPhoto', photo);
    }
  }

});
