define('online-exam-app/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONSerializer.extend({
    serializeIntoHash: function serializeIntoHash(hash, typeClass, snapshot, options) {
      var opts = options || {};
      opts.includeId = true;
      Ember.merge(hash, this.serialize(snapshot, opts));
    }
  });
});