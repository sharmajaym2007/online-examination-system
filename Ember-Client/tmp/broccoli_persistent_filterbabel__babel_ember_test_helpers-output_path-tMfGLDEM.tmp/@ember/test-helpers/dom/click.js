define('@ember/test-helpers/dom/click', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/dom/focus', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-is-focusable', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _focus, _settled, _isFocusable, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.__click__ = __click__;
  exports.default = click;


  /**
    @private
    @method __click__
    @param {Element} element
  */
  function __click__(element) {
    (0, _fireEvent.default)(element, 'mousedown');

    if ((0, _isFocusable.default)(element)) {
      (0, _focus.__focus__)(element);
    }

    (0, _fireEvent.default)(element, 'mouseup');
    (0, _fireEvent.default)(element, 'click');
  }

  /**
    @method click
    @param {String|Element} target
    @return {Promise<void>}
    @public
  */
  function click(target) {
    return (0, _utils.nextTickPromise)().then(function () {
      if (!target) {
        throw new Error('Must pass an element or selector to `click`.');
      }

      var element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error('Element not found when calling `click(\'' + target + '\')`.');
      }

      __click__(element);
      return (0, _settled.default)();
    });
  }
});