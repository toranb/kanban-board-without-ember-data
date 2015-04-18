import registerWithContainer from "ember-cli-auto-register/register";
import Wat from "kanban/controllers/todos/todo";

export function initialize(container, application) {
    registerWithContainer("repositories", application);
    application.inject("repositories", "store", "store:main");
    application.register('controller:todos/todo', Wat, {singleton: true });
}

export default {
    name: "repositories",
    after: "store",
    initialize: initialize
};
