import Ember from 'ember';

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  namespace: 'auth',
  pathForType: function () {
    return '';
  }

  // handleResponse: function (status, headers, payload) {

  //   // return {
  //   //   er_admin: true,
  //   //   navn: 'Navn Navnesen',
  //   //   epost: 'navn.navnesen@dnt.no',
  //   //   gruppe: {
  //   //     _id: '52407f3c4ec4a138150001d7',
  //   //     navn: 'Destinasjon Trysil',
  //   //     tilbyder: 'DNT',
  //   //     endret: '2015-03-27T13:21:57.182Z',
  //   //     status: 'Offentlig',
  //   //     lisens: 'CC BY-NC 4.0'
  //   //   }
  //   // };

  //   if (this.isSuccess(status, headers, payload)) {
  //     return payload;
  //   } else if (this.isInvalid(status, headers, payload)) {
  //     return new InvalidError(payload.errors);
  //   }

  //   let errors = this.normalizeErrorResponse(status, headers, payload);

  //   return new AdapterError(errors);

  // }

});
