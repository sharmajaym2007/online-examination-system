define('@ember/test-helpers/dom/wait-for', ['exports', '@ember/test-helpers/wait-until', '@ember/test-helpers/setup-context', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/-utils'], function (exports, _waitUntil, _setupContext, _getElement, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = waitFor;


  function toArray(nodelist) {
    var array = new Array(nodelist.length);
    for (var i = 0; i < nodelist.length; i++) {
      array[i] = nodelist[i];
    }

    return array;
  }

  /**
    @method waitFor
    @param {string|Element} target
    @param {Object} [options]
    @param {number} [options.timeout=1000]
    @param {number} [options.count=1]
    @returns {Element|Array<Element>}
  */
  function waitFor(target) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === undefined ? 1000 : _ref$timeout,
        _ref$count = _ref.count,
        count = _ref$count === undefined ? null : _ref$count;

    return (0, _utils.nextTickPromise)().then(function () {
      if (!target) {
        throw new Error('Must pass an element or selector to `waitFor`.');
      }

      var callback = void 0;
      if (count !== null) {
        callback = function callback() {
          var context = (0, _setupContext.getContext)();
          var rootElement = context && context.element;
          var elements = rootElement.querySelectorAll(target);
          if (elements.length === count) {
            return toArray(elements);
          }
        };
      } else {
        callback = function callback() {
          return (0, _getElement.default)(target);
        };
      }
      return (0, _waitUntil.default)(callback, { timeout: timeout });
    });
  }
});