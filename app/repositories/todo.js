import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";

export default Ember.Object.extend({
    find: function(id) {
        if (typeof id === "undefined") {
            return this.findAll();
        }
        return this.findById(id);
    },
    findAll: function() {
        var store = this.get("store");
        PromiseMixin.xhr("/api/todos").then(function(response) {
            response.forEach(function(data) {
                store.push("todo", data);
            });
        });
        return store.find("todo");
    },
    findById: function(id) {
        var store = this.get("store");
        var record = store.find("todo", id);
        if(record === null) {
            store.push("todo", {id: id});
            return store.find("todo", id);
        }
        return record;
    }
});
