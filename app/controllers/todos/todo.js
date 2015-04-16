import Ember from "ember";

var TodoController = Ember.Controller.extend({
    todos: Ember.inject.controller()
});

export default TodoController;
