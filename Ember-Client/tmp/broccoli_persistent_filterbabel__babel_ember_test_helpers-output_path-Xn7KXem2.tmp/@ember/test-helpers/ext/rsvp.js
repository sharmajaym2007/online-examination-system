define('@ember/test-helpers/ext/rsvp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._setupPromiseListeners = _setupPromiseListeners;
  exports._teardownPromiseListeners = _teardownPromiseListeners;


  var originalAsync = void 0;
  function _setupPromiseListeners() {
    originalAsync = Ember.RSVP.configure('async');

    Ember.RSVP.configure('async', function (callback, promise) {
      Ember.run.backburner.schedule('actions', function () {
        callback(promise);
      });
    });
  }

  function _teardownPromiseListeners() {
    Ember.RSVP.configure('async', originalAsync);
  }
});