define('online-exam-app/routes/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return ['Marie Curie', 'Mae Jemison', 'Albert Hofmann'];
    }
  });
});