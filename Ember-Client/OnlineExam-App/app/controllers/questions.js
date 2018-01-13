import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  //loginController: Ember.inject.controller('login'),
  //login: Ember.computed.reads('loginController.model'),
  loginDetails: Ember.inject.service('login-details'),
  //login: this.model.login,


  ajax: Ember.inject.service(),
  actions: {
    submitQuestions: function(){
      let loginId =  this.get('loginDetails').getLoginDetails();
      alert('questions.js--'+loginId)
      let questions = this.model.questions.toArray();
      console.log(questions);
      return this.get('ajax').request('/questions?userId='+loginId, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(questions)
      });
    }
  }
});
