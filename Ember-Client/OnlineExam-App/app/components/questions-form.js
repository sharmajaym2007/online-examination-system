import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  loginDetails: Ember.inject.service('login-details'),
  loginDetails123: null,

  init() {
    this._super(...arguments);
    this.loginDetails123 =  this.get('loginDetails').getLoginDetails();
  }

  //loginDetails123:'sandeepJay'
});
