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
        var all = store.find("todo");
        all.set('isLoaded', false);
        PromiseMixin.xhr("/api/todos").then(function(response) {
            response.forEach(function(data) {
                store.push("todo", data);
            });
            all.set('isLoaded', true);
        });
        return all;
    },
    findById: function(id) {
        var store = this.get("store");
        var record = store.find("todo", id);
        if(record === null) {
            store.push("todo", {id: id});
            return store.find("todo", id);
        }
        return record;
    },
    findNotesForTodo: function(id) {
        var store = this.get("store");
        var all = store.find("note");
        all.set('isLoaded', false);
        PromiseMixin.xhr("/api/todos/%@/notes".fmt(id)).then(function(response) {
            response.forEach(function(data) {
                store.push("note", data);
            });
            all.set('isLoaded', true);
        });
        return all;
    }
});
