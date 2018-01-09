define('online-exam-app/models/login', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    userName: _emberData.default.attr('string'),
    password: _emberData.default.attr('string')
  });
});