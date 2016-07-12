define(function(require) {
    var ng = require('angular'),
        todoAppControllers = ng.module('todoapp.controllers', []);

    todoAppControllers.controller('TodoController', require('controllers/TodoController'));

    return todoAppControllers;
});
