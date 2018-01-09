define('@ember/test-helpers/dom/tap', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/dom/click', '@ember/test-helpers/settled', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _click, _settled, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tap;


  /*
    @method tap
    @param {String|Element} target
    @param {Object} options
    @return {Promise}
    @public
  */
  function tap(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return (0, _utils.nextTickPromise)().then(function () {
      if (!target) {
        throw new Error('Must pass an element or selector to `tap`.');
      }

      var element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error('Element not found when calling `tap(\'' + target + '\')`.');
      }

      var touchstartEv = (0, _fireEvent.default)(element, 'touchstart', options);
      var touchendEv = (0, _fireEvent.default)(element, 'touchend', options);

      if (!touchstartEv.defaultPrevented && !touchendEv.defaultPrevented) {
        (0, _click.__click__)(element);
      }

      return (0, _settled.default)();
    });
  }
});