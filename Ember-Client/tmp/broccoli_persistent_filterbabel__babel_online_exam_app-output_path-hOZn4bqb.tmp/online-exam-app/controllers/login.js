define('online-exam-app/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      onSaveLogin: function onSaveLogin() {

        var login = this.model.login;
        var self = this;

        function transitionToPost(login) {
          alert('successfull');
          self.transitionToRoute('contact');
        }

        function failure(reason) {
          alert(reason);
          self.transitionToRoute('contact');
        }

        login.save().then(transitionToPost).catch(failure);

        /*this.store.findRecord('login',1).then((restTest) => {
          alert(restTest.get('title') + ' ' + restTest.get('id'))
        })*/
      }
    }

  });
});