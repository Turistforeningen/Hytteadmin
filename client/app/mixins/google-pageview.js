import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Mixin.create({

  pageviewToGA: function(page, title) {
    var page = page ? page : this.get('url');
    var title = title ? title : this.get('url');

    if (Ember.get(ENV, 'googleAnalytics.webPropertyId') != null) {
      var trackerType = Ember.getWithDefault(ENV, 'googleAnalytics.tracker', 'analytics.js');

      if (trackerType === 'analytics.js') {
        var globalVariable = Ember.getWithDefault(ENV, 'googleAnalytics.globalVariable', 'ga');

        window[globalVariable]('send', 'pageview', {
          page: page,
          title: title
        });
      } else if (trackerType === 'ga.js') {
        window._gaq.push(['_trackPageview']);
      }
    }
  }.on('didTransition')

});
