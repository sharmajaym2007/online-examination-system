define('@ember/test-helpers/setup-rendering-context', ['exports', '@ember/test-helpers/global', '@ember/test-helpers/setup-context', '@ember/test-helpers/-utils', '@ember/test-helpers/settled'], function (exports, _global, _setupContext, _utils, _settled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RENDERING_CLEANUP = undefined;
  exports.render = render;
  exports.clearRender = clearRender;

  exports.default = function (context) {
    var contextGuid = Ember.guidFor(context);
    RENDERING_CLEANUP[contextGuid] = [];

    return (0, _utils.nextTickPromise)().then(function () {
      var owner = context.owner;

      // When the host app uses `setApplication` (instead of `setResolver`) the event dispatcher has
      // already been setup via `applicationInstance.boot()` in `./build-owner`. If using
      // `setResolver` (instead of `setApplication`) a "mock owner" is created by extending
      // `Ember._ContainerProxyMixin` and `Ember._RegistryProxyMixin` in this scenario we need to
      // manually start the event dispatcher.

      if (owner._emberTestHelpersMockOwner) {
        var dispatcher = owner.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
        dispatcher.setup({}, '#ember-testing');
      }

      var OutletView = owner.factoryFor ? owner.factoryFor('view:-outlet') : owner._lookupFactory('view:-outlet');
      var toplevelView = OutletView.create();
      var OutletTemplate = owner.lookup('template:-outlet');
      if (!OutletTemplate) {
        owner.register('template:-outlet', Ember.HTMLBars.template({
          "id": "gc40spmP",
          "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}",
          "meta": {}
        }));
        OutletTemplate = owner.lookup('template:-outlet');
      }

      // push this into the rendering specific cleanup bucket, to be ran during
      // `teardownRenderingContext` but before the owner itself is destroyed
      RENDERING_CLEANUP[contextGuid].push(function () {
        return toplevelView.destroy();
      });

      var outletState = {
        render: {
          owner: owner,
          into: undefined,
          outlet: 'main',
          name: 'application',
          controller: context,
          ViewClass: undefined,
          template: OutletTemplate
        },

        outlets: {}
      };
      toplevelView.setOutletState(outletState);

      // TODO: make this id configurable
      Ember.run(toplevelView, 'appendTo', '#ember-testing');

      // ensure the element is based on the wrapping toplevel view
      // Ember still wraps the main application template with a
      // normal tagged view
      //
      // In older Ember versions (2.4) the element itself is not stable,
      // and therefore we cannot update the `this.element` until after the
      // rendering is completed
      context.element = document.querySelector('#ember-testing > .ember-view');

      var templateId = 0;

      context.render = function render(template) {
        if (!template) {
          throw new Error('you must pass a template to `render()`');
        }

        return (0, _utils.nextTickPromise)().then(function () {
          templateId += 1;
          var templateFullName = 'template:-undertest-' + templateId;
          owner.register(templateFullName, template);
          var stateToRender = {
            owner: owner,
            into: undefined,
            outlet: 'main',
            name: 'index',
            controller: context,
            ViewClass: undefined,
            template: owner.lookup(templateFullName),
            outlets: {}
          };

          stateToRender.name = 'index';
          outletState.outlets.main = { render: stateToRender, outlets: {} };

          toplevelView.setOutletState(outletState);

          // using next here because the actual rendering does not happen until
          // the renderer detects it is dirty (which happens on backburner's end
          // hook), see the following implementation details:
          //
          // * [view:outlet](https://github.com/emberjs/ember.js/blob/f94a4b6aef5b41b96ef2e481f35e07608df01440/packages/ember-glimmer/lib/views/outlet.js#L129-L145) manually dirties its own tag upon `setOutletState`
          // * [backburner's custom end hook](https://github.com/emberjs/ember.js/blob/f94a4b6aef5b41b96ef2e481f35e07608df01440/packages/ember-glimmer/lib/renderer.js#L145-L159) detects that the current revision of the root is no longer the latest, and triggers a new rendering transaction
          return (0, _settled.default)();
        });
      };

      if (_global.default.jQuery) {
        context.$ = function $(selector) {
          // emulates Ember internal behavor of `this.$` in a component
          // https://github.com/emberjs/ember.js/blob/v2.5.1/packages/ember-views/lib/views/states/has_element.js#L18
          return selector ? _global.default.jQuery(selector, context.element) : _global.default.jQuery(context.element);
        };
      }

      context.clearRender = function clearRender() {
        return (0, _utils.nextTickPromise)().then(function () {
          toplevelView.setOutletState({
            render: {
              owner: owner,
              into: undefined,
              outlet: 'main',
              name: 'application',
              controller: context,
              ViewClass: undefined,
              template: OutletTemplate
            },
            outlets: {}
          });

          return (0, _settled.default)();
        });
      };

      return context;
    });
  };

  var RENDERING_CLEANUP = exports.RENDERING_CLEANUP = Object.create(null);

  function render(template) {
    var context = (0, _setupContext.getContext)();

    if (!context || typeof context.render !== 'function') {
      throw new Error('Cannot call `render` without having first called `setupRenderingContext`.');
    }

    return context.render(template);
  }

  function clearRender() {
    var context = (0, _setupContext.getContext)();

    if (!context || typeof context.clearRender !== 'function') {
      throw new Error('Cannot call `clearRender` without having first called `setupRenderingContext`.');
    }

    return context.clearRender();
  }

  /*
   * Responsible for:
   *
   * - Creating a basic rendering setup (e.g. setting up the main outlet view)
   * - Adding `this.render` to the provided context
   * - Adding `this.clearRender` to the provided context
   */
});