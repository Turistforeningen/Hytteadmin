import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  user: null,
  cabin: null,
  attributeBindings: ['user', 'cabin'],

  deleteMode: false,

  actions: {
    deleteCabin: function () {
      const cabin = this.get('cabin');
      cabin.destroyRecord();
    }
  },

  utUrl: Ember.computed('cabin.id', {
    get: function () {
      return ['//www.ut.no', 'hytte', this.get('cabin.id')].join('/');
    }
  }),

  userIsAdmin: Ember.computed('user.er_admin', {
    get: function () {
      return this.get('user.er_admin');
    }
  }),

  userHasAccess: Ember.computed('user', 'cabin', {
    get: function () {
      let userHasAccess = false;
      let user = this.get('user');
      let object = this.get('cabin');

      if (!user) {
        return false;
      }

      if (user.get('er_admin') === true) {
        return true;
      }

      var userGroups = user.get('grupper') || [];
      var objectGroups = object.get('grupper') || [];

      if (user.get('gruppe.id')) {
        userGroups.addObject(user.get('gruppe.id'));
      }

      if (userGroups.get('length') === 0) {
        return false;
      }

      if (object.get('privat.juridisk_eier')) {
        objectGroups.addObject(object.get('privat.juridisk_eier'));
      }

      if (object.get('privat.vedlikeholdes_av')) {
        objectGroups.addObject(object.get('privat.vedlikeholdes_av'));
      }

      userHasAccess = userGroups.find(function (item, index, enumerable) {
        if (objectGroups.indexOf(item.get('id')) !== -1) {
          return true;
        }
      });

      return userHasAccess;
    }
  })
});
