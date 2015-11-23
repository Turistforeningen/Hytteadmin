'use strict';

/**
 * Return UT.no hyttetype number for owner and service level
 *
 * @params String type - cabin owner type
 * @params String service - cabin service level
 *
 * @returns Number of cabin type; or undefined
 */
const hyttetype = function hyttetype (type, service) {
  const types = new Map([
    ['DNT:Betjent'     , 1002],
    ['DNT:Servering'   , 1011],
    ['DNT:Dagshytte'   , 1010],
    ['DNT:Nødbu'       , 1010],
    ['DNT:Selvbetjent' , 1001],
    ['DNT:Ubetjent'    , 1000],
    ['!DNT:Betjent'    , 1006],
    ['!DNT:Servering'  , 1009],
    ['!DNT:Dagshytte'  , 1008],
    ['!DNT:Nødbu'      , 1008],
    ['!DNT:Selvbetjent', 1005],
    ['!DNT:Ubetjent'   , 1004]
  ]);

  return types.get(`${type === 'DNT' ? 'DNT' : '!DNT'}:${service}`);
};
module.exports.hyttetype = hyttetype;

/**
 * Make changes to request object to make sure it meet UT requirements
 *
 * @params Object body - original req.body object
 *
 * @returns Object body that should replace the original req.body
 */
const utify = function utify (body) {
  body.privat = body.privat || {};

  // UT is expecting a cababin type integer property in the private scope in
  // order to display the correct map icon for the cabin.
  body.privat.hyttetype = hyttetype(
    body.privat.hytteeier,
    body.betjeningsgrad
  );
  // In Turadmin we have separated cabin access between private and public
  // transportation. UT.no has not caught up with these changes, so for the time
  // being we have to make sure the old `adkomst` filed stays populated.
  body.adkomst = body.tilkomst.privat;

  // UT.no is expecting `senger` to be an object property in the private scope.
  body.privat.senger = body.senger;

  return body;
};
module.exports.utify = utify;
