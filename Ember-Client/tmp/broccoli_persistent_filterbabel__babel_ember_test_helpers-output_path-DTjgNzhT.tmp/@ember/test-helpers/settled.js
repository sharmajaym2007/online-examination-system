define('@ember/test-helpers/settled', ['exports', '@ember/test-helpers/-utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._teardownAJAXHooks = _teardownAJAXHooks;
  exports._setupAJAXHooks = _setupAJAXHooks;
  exports.getState = getState;
  exports.isSettled = isSettled;
  exports.default = settled;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  // Ember internally tracks AJAX requests in the same way that we do here for
  // legacy style "acceptance" tests using the `ember-testing.js` asset provided
  // by emberjs/ember.js itself. When `@ember/test-helpers`'s `settled` utility
  // is used in a legacy acceptance test context any pending AJAX requests are
  // not properly considered during the `isSettled` check below.
  //
  // This utilizes a local utility method present in Ember since around 2.8.0 to
  // properly consider pending AJAX requests done within legacy acceptance tests.
  var _internalPendingRequests = function () {
    if (Ember.__loader.registry['ember-testing/test/pending_requests']) {
      return Ember.__loader.require('ember-testing/test/pending_requests').pendingRequests;
    }

    return function () {
      return 0;
    };
  }();

  var requests = void 0;

  function pendingRequests() {
    var localRequestsPending = requests !== undefined ? requests.length : 0;
    var internalRequestsPending = _internalPendingRequests();

    return localRequestsPending + internalRequestsPending;
  }

  function incrementAjaxPendingRequests(_, xhr) {
    requests.push(xhr);
  }

  function decrementAjaxPendingRequests(_, xhr) {
    // In most Ember versions to date (current version is 2.16) RSVP promises are
    // configured to flush in the actions queue of the Ember run loop, however it
    // is possible that in the future this changes to use "true" micro-task
    // queues.
    //
    // The entire point here, is that _whenever_ promises are resolved will be
    // before the next run of the JS event loop. Then in the next event loop this
    // counter will decrement. In the specific case of AJAX, this means that any
    // promises chained off of `$.ajax` will properly have their `.then` called
    // _before_ this is decremented (and testing continues)
    (0, _utils.nextTick)(function () {
      for (var i = 0; i < requests.length; i++) {
        if (xhr === requests[i]) {
          requests.splice(i, 1);
        }
      }
    }, 0);
  }

  function _teardownAJAXHooks() {
    if (!Ember.$) {
      return;
    }

    Ember.$(document).off('ajaxSend', incrementAjaxPendingRequests);
    Ember.$(document).off('ajaxComplete', decrementAjaxPendingRequests);
  }

  function _setupAJAXHooks() {
    requests = [];

    if (!Ember.$) {
      return;
    }

    Ember.$(document).on('ajaxSend', incrementAjaxPendingRequests);
    Ember.$(document).on('ajaxComplete', decrementAjaxPendingRequests);
  }

  var _internalCheckWaiters = void 0;
  if (Ember.__loader.registry['ember-testing/test/waiters']) {
    _internalCheckWaiters = Ember.__loader.require('ember-testing/test/waiters').checkWaiters;
  }

  function checkWaiters() {
    if (_internalCheckWaiters) {
      return _internalCheckWaiters();
    } else if (Ember.Test.waiters) {
      if (Ember.Test.waiters.any(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            context = _ref2[0],
            callback = _ref2[1];

        return !callback.call(context);
      })) {
        return true;
      }
    }

    return false;
  }

  function getState() {
    var pendingRequestCount = pendingRequests();

    return {
      hasPendingTimers: Boolean(Ember.run.hasScheduledTimers()),
      hasRunLoop: Boolean(Ember.run.currentRunLoop),
      hasPendingWaiters: checkWaiters(),
      hasPendingRequests: pendingRequestCount > 0,
      pendingRequestCount: pendingRequestCount
    };
  }

  function isSettled(options) {
    var waitForTimers = true;
    var waitForAJAX = true;
    var waitForWaiters = true;

    if (options !== undefined) {
      waitForTimers = 'waitForTimers' in options ? options.waitForTimers : true;
      waitForAJAX = 'waitForAJAX' in options ? options.waitForAJAX : true;
      waitForWaiters = 'waitForWaiters' in options ? options.waitForWaiters : true;
    }

    var _getState = getState(),
        hasPendingTimers = _getState.hasPendingTimers,
        hasRunLoop = _getState.hasRunLoop,
        hasPendingRequests = _getState.hasPendingRequests,
        hasPendingWaiters = _getState.hasPendingWaiters;

    if (waitForTimers && (hasPendingTimers || hasRunLoop)) {
      return false;
    }

    if (waitForAJAX && hasPendingRequests) {
      return false;
    }

    if (waitForWaiters && hasPendingWaiters) {
      return false;
    }

    return true;
  }

  var TIMEOUTS = [0, 1, 2, 5];
  var MAX_TIMEOUT = 10;

  function settled(options) {
    return new Ember.RSVP.Promise(function (resolve) {
      function scheduleCheck(counter) {
        var timeout = TIMEOUTS[counter];
        if (timeout === undefined) {
          timeout = MAX_TIMEOUT;
        }

        (0, _utils.futureTick)(function () {
          var settled = isSettled(options);
          if (settled) {
            // Synchronously resolve the promise
            Ember.run(null, resolve);
          } else {
            scheduleCheck(counter + 1);
          }
        }, timeout);
      }

      scheduleCheck(0);
    });
  }
});