import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  userDetails: Ember.inject.service('user-details'),
  actions: {
    buttonStart: function(){
      this.transitionToRoute('questions');
      this.get('userDetails').addUserId(this.model);
    }
  }

});
