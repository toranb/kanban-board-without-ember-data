import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";

export default Ember.Object.extend({
    find: function() {
        var store = this.get("store");
        return PromiseMixin.xhr("/api/todos").then(function(response) {
            response.forEach(function(data) {
                store.push("todo", data);
            });
            return store.find("todo");
        });
    }
});
