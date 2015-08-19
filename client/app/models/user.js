import DS from 'ember-data';

export default DS.Model.extend({
  navn: DS.attr('string'),
  er_admin: DS.attr('boolean', {defaultValue: false})
});
