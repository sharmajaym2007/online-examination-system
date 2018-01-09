define('@ember/test-helpers/dom/blur', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-is-focusable', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _isFocusable, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.__blur__ = __blur__;
  exports.default = blur;


  /**
    @private
    @method __blur__
    @param {Element} element
  */
  function __blur__(element) {
    var browserIsNotFocused = document.hasFocus && !document.hasFocus();

    // makes `document.activeElement` be `body`.
    // If the browser is focused, it also fires a blur event
    element.blur();

    // Chrome/Firefox does not trigger the `blur` event if the window
    // does not have focus. If the document does not have focus then
    // fire `blur` event via native event.
    if (browserIsNotFocused) {
      (0, _fireEvent.default)(element, 'blur', { bubbles: false });
      (0, _fireEvent.default)(element, 'focusout');
    }
  }

  /**
    @method blur
    @param {String|Element} [target=document.activeElement] the element to blur
    @return {Promise<void>}
    @public
  */
  function blur() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.activeElement;

    return (0, _utils.nextTickPromise)().then(function () {
      var element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error('Element not found when calling `blur(\'' + target + '\')`.');
      }

      if (!(0, _isFocusable.default)(element)) {
        throw new Error(target + ' is not focusable');
      }

      __blur__(element);

      return (0, _settled.default)();
    });
  }
});