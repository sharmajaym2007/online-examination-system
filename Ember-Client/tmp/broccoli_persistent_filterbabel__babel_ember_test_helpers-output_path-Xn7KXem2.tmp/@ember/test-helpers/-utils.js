define('@ember/test-helpers/-utils', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nextTickPromise = nextTickPromise;
  exports.runDestroyablesFor = runDestroyablesFor;
  var nextTick = exports.nextTick = setTimeout;
  var futureTick = exports.futureTick = setTimeout;

  function nextTickPromise() {
    return new Ember.RSVP.Promise(function (resolve) {
      nextTick(resolve);
    });
  }

  function runDestroyablesFor(bucket, key) {
    var destroyables = bucket[key];

    if (!destroyables) {
      return;
    }

    for (var i = 0; i < destroyables.length; i++) {
      destroyables[i]();
    }

    delete bucket[key];
  }
});