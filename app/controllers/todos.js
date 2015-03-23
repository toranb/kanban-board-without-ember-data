import Ember from "ember";

export default Ember.Controller.extend({
    needs: "application",
    isActiveRoute: Ember.computed.equal("controllers.application.currentRouteName", "todos.index"),
    actions: {
        assign: function(todo) {
            todo.set("status_code", 2);
        }
    },
    unassigned: function() {
        return this.get("model").filter(function(model) {
            return model.status_code === 1;
        });
    }.property("model.@each.status_code"),
    assigned: function() {
        return this.get("model").filter(function(model) {
            return model.status_code === 2;
        });
    }.property("model.@each.status_code")
});
