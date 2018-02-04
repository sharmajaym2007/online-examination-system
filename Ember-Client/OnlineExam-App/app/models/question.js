import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr(),
  userChoice: DS.attr(),
  correctAnswer: DS.attr(),
  isEditEnabled: DS.attr(),
  choiceA: DS.attr(),
  choiceB: DS.attr(),
  choiceC: DS.attr(),
  choiceD: DS.attr(),
});
