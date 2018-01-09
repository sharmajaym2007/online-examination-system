define('@ember/test-helpers/dom/trigger-key-event', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = triggerKeyEvent;


  var DEFAULT_MODIFIERS = Object.freeze({
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false
  });

  /**
    @public
    @param {String|Element} target
    @param {'keydown' | 'keyup' | 'keypress'} eventType
    @param {String} keyCode
    @param {Object} [modifiers]
    @param {Boolean} [modifiers.ctrlKey=false]
    @param {Boolean} [modifiers.altKey=false]
    @param {Boolean} [modifiers.shiftKey=false]
    @param {Boolean} [modifiers.metaKey=false]
    @return {Promise<void>}
  */
  function triggerKeyEvent(target, eventType, keyCode) {
    var modifiers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_MODIFIERS;

    return (0, _utils.nextTickPromise)().then(function () {
      if (!target) {
        throw new Error('Must pass an element or selector to `triggerKeyEvent`.');
      }

      var element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error('Element not found when calling `triggerKeyEvent(\'' + target + '\', ...)`.');
      }

      if (!eventType) {
        throw new Error('Must provide an `eventType` to `triggerKeyEvent`');
      }

      if (_fireEvent.KEYBOARD_EVENT_TYPES.indexOf(eventType) === -1) {
        var validEventTypes = _fireEvent.KEYBOARD_EVENT_TYPES.join(', ');
        throw new Error('Must provide an `eventType` of ' + validEventTypes + ' to `triggerKeyEvent` but you passed `' + eventType + '`.');
      }

      if (!keyCode) {
        throw new Error('Must provide a `keyCode` to `triggerKeyEvent`');
      }

      var options = Ember.merge({ keyCode: keyCode, which: keyCode, key: keyCode }, modifiers);

      (0, _fireEvent.default)(element, eventType, options);

      return (0, _settled.default)();
    });
  }
});