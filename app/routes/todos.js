import Ember from "ember";

export default Ember.Route.extend({
    model: function() {
        var repository = this.get("repository");
        return repository.find();
    }
});
