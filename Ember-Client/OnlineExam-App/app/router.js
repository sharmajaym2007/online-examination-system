import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/oems' });
  this.route('about', {path: '/oems/about' });
  this.route('contact', {path: '/oems/contact' });
  this.route('login', {path: '/oems/login' });
  this.route('welcome');
  this.route('questions',{path: '/oems/questions/' });
  this.route('staff', {path: '/oems/staff/' });
  this.route('review');
  this.route('review',{path: '/oems/review/' });
  
});

export default Router;
