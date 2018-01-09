define('online-exam-app/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      loginForm: function loginForm() {
        var userNameLocal = this.get('userName');
        var passwordLocal = this.get('password');
        alert(userNameLocal + passwordLocal);
        var newRecord = this.store.createRecord('login', {
          userName: userNameLocal, password: passwordLocal
        });

        var self = this;

        function transitionToPost(newRecord) {
          alert('Commodity updated successfully');
          self.transitionToRoute('contact');
        }

        function failure(reason) {
          alert(reason);
          self.transitionToRoute('contact');
        }

        newRecord.save().then(transitionToPost).catch(failure);

        /*this.store.findRecord('login',1).then((restTest) => {
          alert(restTest.get('title') + ' ' + restTest.get('id'))
        })*/
      }
    }

  });
});