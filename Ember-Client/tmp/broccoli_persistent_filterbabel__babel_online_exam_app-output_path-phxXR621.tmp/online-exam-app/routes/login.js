define('online-exam-app/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {

      return Ember.RSVP.hash({
        // 'loginInfo': this.store.createRecord('login', {
        //     userName: this.get("userName"), password: this.get("password")
        // })
        'login': this.store.createRecord('login')

      });
    }
  });
});