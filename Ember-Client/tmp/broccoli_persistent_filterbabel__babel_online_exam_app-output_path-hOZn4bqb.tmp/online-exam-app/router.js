define('online-exam-app/router', ['exports', 'online-exam-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('home', { path: '/oems' });
    this.route('about', { path: '/oems/about' });
    this.route('contact', { path: '/oems/contact' });
    this.route('login', { path: '/oems/login' });
  });

  exports.default = Router;
});