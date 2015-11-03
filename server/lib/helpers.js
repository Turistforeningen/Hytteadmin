'use strict';

/**
 * Return UT.no hyttetype number for owner and service level
 *
 * @params String type - cabin owner type
 * @params String service - cabin service level
 *
 * @returns Number of cabin type; or undefined
 */
module.exports.hyttetype = function hyttetype(type, service) {
  const types = new Map([
    ['DNT:Betjent'     , 1002],
    ['DNT:Stengt'      , 1011],
    ['DNT:Dagshytte'   , 1010],
    ['DNT:Nødbu'       , 1010],
    ['DNT:Selvbetjent' , 1001],
    ['DNT:Ubetjent'    , 1000],
    ['!DNT:Betjent'    , 1006],
    ['!DNT:Stengt'     , 1009],
    ['!DNT:Dagshytte'  , 1008],
    ['!DNT:Nødbu'      , 1008],
    ['!DNT:Selvbetjent', 1005],
    ['!DNT:Ubetejent'  , 1004]
  ]);

  return types.get(`${type === 'DNT' ? 'DNT' : '!DNT'}:${service}`);
};
