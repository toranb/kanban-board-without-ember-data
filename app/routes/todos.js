import Ember from "ember";
import inject from "kanban/utilities/inject";

export default Ember.Route.extend({
    repository: inject("todo"),
    model: function() {
        var repository = this.get("repository");
        return repository.find();
    }
});
