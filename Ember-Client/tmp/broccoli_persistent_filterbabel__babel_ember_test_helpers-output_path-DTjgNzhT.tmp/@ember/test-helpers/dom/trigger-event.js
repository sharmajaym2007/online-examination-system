define('@ember/test-helpers/dom/trigger-event', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = triggerEvent;


  /**
    @method triggerEvent
    @param {String|Element} target
    @param {String} eventType
    @param {Object} options
    @return {Promise<void>}
    @public
  */
  function triggerEvent(target, type, options) {
    return (0, _utils.nextTickPromise)().then(function () {
      if (!target) {
        throw new Error('Must pass an element or selector to `triggerEvent`.');
      }

      var element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error('Element not found when calling `triggerEvent(\'' + target + '\', ...)`.');
      }

      if (!type) {
        throw new Error('Must provide an `eventType` to `triggerEvent`');
      }

      (0, _fireEvent.default)(element, type, options);

      return (0, _settled.default)();
    });
  }
});