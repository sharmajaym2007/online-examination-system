import Route from '@ember/routing/route';

export default Route.extend({
  userDetails: Ember.inject.service('user-details'),
  model(){
    return ({
      'questions' : this.get('userDetails').getQuestions()
      .forEach(function(question) {
            question.set('isEditEnabled', false); // here will be implemented your function to determine if note is selected or not
          })
        })
  }
});
