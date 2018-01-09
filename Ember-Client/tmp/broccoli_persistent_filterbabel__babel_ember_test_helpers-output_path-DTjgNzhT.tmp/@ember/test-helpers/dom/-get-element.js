define('@ember/test-helpers/dom/-get-element', ['exports', '@ember/test-helpers/setup-context'], function (exports, _setupContext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getElement;
  function getElement(selectorOrElement) {
    if (selectorOrElement instanceof Window || selectorOrElement instanceof Document || selectorOrElement instanceof Element) {
      return selectorOrElement;
    } else if (typeof selectorOrElement === 'string') {
      var context = (0, _setupContext.getContext)();
      var rootElement = context && context.element;
      if (!rootElement) {
        throw new Error('Must setup rendering context before attempting to interact with elements.');
      }

      return rootElement.querySelector(selectorOrElement);
    } else {
      throw new Error('Must use an element or a selector string');
    }
  }
});