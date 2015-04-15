import Ember from "ember";

var TodoController = Ember.Controller.extend({
    needs: "todos",
    isLoaded: function() {
        return this.get("controllers.todos.model.isLoaded");
    }.property("controllers.todos.model.isLoaded")
});

export default TodoController;
