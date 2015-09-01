import DS from 'ember-data';

export default DS.Model.extend({
  navn: DS.attr('string'),
  epost: DS.attr('string'),
  er_admin: DS.attr('boolean', {defaultValue: false}),
  gruppe: DS.belongsTo('group', {async: true}),
  grupper: DS.hasMany('group', {async: true})
});
