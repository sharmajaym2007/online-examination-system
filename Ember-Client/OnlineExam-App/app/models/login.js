import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  userName: DS.attr(),
  role: DS.attr(),
  isValid: DS.attr(),
});
