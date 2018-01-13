import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr(),
  userChoice: DS.attr(),
  correctAnswer: DS.attr(),
  choices: DS.attr('array')
});
