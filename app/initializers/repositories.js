import TodoRepository from "kanban/repositories/todo";

export function initialize(container, application) {
    application.register("repositories:todo", TodoRepository);
    application.inject("repositories", "store", "store:main");

    //manually wire up the repository for routes and controllers
    application.inject("route", "repository", "repositories:todo");
    application.inject("controller", "repository", "repositories:todo");
}

export default {
    name: "repositories",
    after: "store",
    initialize: initialize
};
