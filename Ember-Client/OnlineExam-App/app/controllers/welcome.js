import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  loginDetails: Ember.inject.service('login-details'),
  actions: {
    buttonStart: function(){
      this.transitionToRoute('questions');
      this.get('loginDetails').add(this.model);
    }
  }

});
