import Ember from "ember";

export default Ember.Object.extend({
    status: function() {
        var status_code = this.get("status_code");
        return status_code === 1 ? "Unassigned" : "Assigned";
    }.property("status_code")
});
