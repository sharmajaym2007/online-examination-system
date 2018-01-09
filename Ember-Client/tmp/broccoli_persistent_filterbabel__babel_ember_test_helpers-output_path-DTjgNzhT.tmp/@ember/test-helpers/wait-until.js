define('@ember/test-helpers/wait-until', ['exports', '@ember/test-helpers/-utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (callback) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var timeout = 'timeout' in options ? options.timeout : 1000;

    // creating this error eagerly so it has the proper invocation stack
    var waitUntilTimedOut = new Error('waitUntil timed out');

    return new Ember.RSVP.Promise(function (resolve, reject) {
      // starting at -10 because the first invocation happens on 0
      // but still increments the time...
      var time = -10;
      function tick() {
        time += 10;

        var value = void 0;
        try {
          value = callback();
        } catch (error) {
          reject(error);
        }

        if (value) {
          resolve(value);
        } else if (time < timeout) {
          // using `setTimeout` directly to allow fake timers
          // to intercept
          (0, _utils.nextTick)(tick, 10);
        } else {
          reject(waitUntilTimedOut);
        }
      }

      (0, _utils.nextTick)(tick);
    });
  };
});