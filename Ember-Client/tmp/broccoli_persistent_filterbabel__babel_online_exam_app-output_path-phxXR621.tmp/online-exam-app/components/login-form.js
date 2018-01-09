define('online-exam-app/components/login-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      loginForm: function loginForm() {

        this.get('onSave')();
      }
    }
  });
});