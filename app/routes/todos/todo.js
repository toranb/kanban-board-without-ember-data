import Ember from "ember";

export default Ember.Route.extend({
    model: function(params) {
        var store = this.get("store");
        return store.find("todo", params.todo_id);
    }
});
