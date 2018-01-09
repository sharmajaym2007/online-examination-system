define('@ember/test-helpers/setup-context', ['exports', '@ember/test-helpers/build-owner', '@ember/test-helpers/ext/rsvp', '@ember/test-helpers/settled', '@ember/test-helpers/global', '@ember/test-helpers/resolver', '@ember/test-helpers/application', '@ember/test-helpers/-utils'], function (exports, _buildOwner, _rsvp, _settled, _global, _resolver, _application, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CLEANUP = undefined;
  exports.setContext = setContext;
  exports.getContext = getContext;
  exports.unsetContext = unsetContext;
  exports.pauseTest = pauseTest;
  exports.resumeTest = resumeTest;

  exports.default = function (context) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Ember.testing = true;
    setContext(context);

    var contextGuid = Ember.guidFor(context);
    CLEANUP[contextGuid] = [];

    var testElementContainer = document.getElementById('ember-testing-container');
    var fixtureResetValue = testElementContainer.innerHTML;

    // push this into the final cleanup bucket, to be ran _after_ the owner
    // is destroyed and settled (e.g. flushed run loops, etc)
    CLEANUP[contextGuid].push(function () {
      testElementContainer.innerHTML = fixtureResetValue;
    });

    return (0, _utils.nextTickPromise)().then(function () {
      var resolver = options.resolver;

      var buildOwnerOptions = void 0;

      // This handles precendence, specifying a specific option of
      // resolver always trumps whatever is auto-detected, then we fallback to
      // the suite-wide registrations
      //
      // At some later time this can be extended to support specifying a custom
      // engine or application...
      if (resolver) {
        buildOwnerOptions = { resolver: resolver };
      } else {
        buildOwnerOptions = {
          resolver: (0, _resolver.getResolver)(),
          application: (0, _application.getApplication)()
        };
      }

      return (0, _buildOwner.default)(buildOwnerOptions);
    }).then(function (owner) {
      context.owner = owner;

      context.set = function (key, value) {
        var ret = Ember.run(function () {
          return Ember.set(context, key, value);
        });

        return ret;
      };

      context.setProperties = function (hash) {
        var ret = Ember.run(function () {
          return Ember.setProperties(context, hash);
        });

        return ret;
      };

      context.get = function (key) {
        return Ember.get(context, key);
      };

      context.getProperties = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return Ember.getProperties(context, args);
      };

      var resume = void 0;
      context.resumeTest = function resumeTest() {
        (true && !(resume) && Ember.assert('Testing has not been paused. There is nothing to resume.', resume));

        resume();
        _global.default.resumeTest = resume = undefined;
      };

      context.pauseTest = function pauseTest() {
        console.info('Testing paused. Use `resumeTest()` to continue.'); // eslint-disable-line no-console

        return new Ember.RSVP.Promise(function (resolve) {
          resume = resolve;
          _global.default.resumeTest = resumeTest;
        }, 'TestAdapter paused promise');
      };

      (0, _settled._setupAJAXHooks)();
      (0, _rsvp._setupPromiseListeners)();

      return context;
    });
  };

  var __test_context__ = void 0;

  function setContext(context) {
    __test_context__ = context;
  }

  function getContext() {
    return __test_context__;
  }

  function unsetContext() {
    __test_context__ = undefined;
  }

  function pauseTest() {
    var context = getContext();

    if (!context || typeof context.pauseTest !== 'function') {
      throw new Error('Cannot call `pauseTest` without having first called `setupTest` or `setupRenderingTest`.');
    }

    return context.pauseTest();
  }

  function resumeTest() {
    var context = getContext();

    if (!context || typeof context.resumeTest !== 'function') {
      throw new Error('Cannot call `resumeTest` without having first called `setupTest` or `setupRenderingTest`.');
    }

    return context.resumeTest();
  }

  var CLEANUP = exports.CLEANUP = Object.create(null);

  /*
   * Responsible for:
   *
   * - sets the "global testing context" to the provided context
   * - create an owner object and set it on the provided context (e.g. this.owner)
   * - setup this.set, this.setProperties, this.get, and this.getProperties to the provided context
   * - setting up AJAX listeners
   * - setting up RSVP promise integration
   */
});