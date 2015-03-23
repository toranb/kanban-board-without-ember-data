import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("todos", {path: "/"}, function() {
        this.route("todo", {path: "/todo/:todo_id"});
    });
});

export default Router;
