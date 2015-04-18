import Ember from "ember";
import inject from "kanban/utilities/inject";

export default Ember.Route.extend({
    repository: inject("todo"),
    model: function(params) {
        var repository = this.get("repository");
        var todo = repository.find(params.todo_id);
        var notes = repository.findNotesForTodo(params.todo_id);
        return Ember.RSVP.hash({todo: todo, notes: notes});
    },
    setupController: function(controller, hash) {
        controller.set("model", hash.todo);
        controller.set("related", hash.notes);
    }
});
