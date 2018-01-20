import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  //loginController: Ember.inject.controller('login'),
  //login: Ember.computed.reads('loginController.model'),
  userDetails: Ember.inject.service('user-details'),
  //login: this.model.login,
  ajax: Ember.inject.service(),

  actions: {
    submitQuestions: function(){
      this.get('userDetails').addQuestions(this.model.questions)
      this.transitionToRoute('review');

      // let loginId = this.get('getUserId').getLoginDetails();
      // let questions = this.model.questions.toArray();
      // console.log(questions);
      // return this.get('ajax').request('/questions?userId='+loginId, {
      //   method: 'POST',
      //   contentType: 'application/json',
      //   data: JSON.stringify(questions)
      // });
    }
  }
});
