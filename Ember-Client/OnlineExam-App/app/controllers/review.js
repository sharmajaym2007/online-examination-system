import Controller from '@ember/controller';

export default Controller.extend({
  userDetails : Ember.inject.service('user-details'),
  actions: {
    init: function() {
       this._super();
       this.setTotalAnswersSelected();
       let questions = this.model.questions
    },

    setTotalAnswersSelected() {
      questions.forEach(function(question) {
        
      })
    },
    submitQuestions: function(){
      console.log(questions.toArray())
      let loginId = this.get('userDetails').getUserId();
      // let questions = this.model.questions.toArray();
      // console.log(questions);
      // return this.get('ajax').request('/questions?userId='+loginId, {
      //   method: 'POST',
      //   contentType: 'application/json',
      //   data: JSON.stringify(questions)
      // });
    },
    toggleQuestionsRadio(question){
      let isSelected = question.get('isEditEnabled')
      if (isSelected) {
        question.set('isEditEnabled', false)
      }
      else {
        question.set('isEditEnabled', true)
      }
    }
  }
});
