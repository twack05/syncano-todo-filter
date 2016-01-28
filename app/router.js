import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('todos', {path: '/'}, function() {
    this.route('active');
    this.route('completed');
  });
  this.route('todosIndex');
  this.route('todos-active');
  this.route('todos');
});

export default Router;
