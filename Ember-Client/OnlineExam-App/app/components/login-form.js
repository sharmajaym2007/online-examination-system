import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  loginDetails: Ember.inject.service('login-details'),
  sandeep123: 'sandeepyo',
  actions: {
    buttonLogin: function() {
        let login = JSON.parse(JSON.stringify(this.login));
        //this.get('loginDetails').add(login.userName);
        this.get('onSave')();//Login.hbs has this attribute which executes
  }
}
});
