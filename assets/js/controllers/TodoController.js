(function() {
    'use strict';

    function TodoController($scope, $http) {
        $scope.todos = [];

        // populating the list with task from db
        $http
            .get('/task/find')
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].index = i;
                }

                $scope.todos = data;
            });

        // adding new task
        $scope.addTodo = function() {
            if (!$scope.newTodo.length) {
                return;
            }

            $http
                .get('/task/create?title=' + $scope.newTodo)
                .success(function(data) {
                    $scope.todos.push({
                        title: $scope.newTodo,
                        completed: false
                    });

                    $scope.newTodo = '';
                });
        };

        // editing the task
        $scope.editTodo = function(todo) {
            $scope.editTodo = todo;
        };

        // finishing editing
        $scope.doneEditing = function(todo) {
            $http.put('/task/' + todo.id, {
                completed: todo.completed,
                title: todo.title
            }).success(function() {
                $scope.editedTodo = null;

                if (!todo.title) {
                    $scope.removeTodo(todo);
                }
            });
        };

        // removes todo
        $scope.removeTodo = function(todo) {
            $http.delete('/task/' + todo.id, {
                params: {
                    completed: true
                }
            }).success(function() {
                $scope.todos.splice($scope.todos.indexOf(todo), 1);
            });
        };

        // marks all the todos completed
        $scope.markAll = function(completed) {
            $scope.todos.forEach(function(todo) {
                todo.completed = true;
                $scope.changeCompleted(todo);   
            });
        };

        // changes todo state
        $scope.changeCompleted = function(todo) {
            $http.put('/task/' + todo.id, {
                completed: todo.completed
            });
        };

        // hides completed todos
        $scope.clearCompletedTodos = function() {
            $scope.todos.filter(function(todo) {
                return !todo.completed;
            });
        };
    }

    TodoController.$inject = ['$scope', '$http'];

    angular
        .module('app')
        .controller('TodoController', TodoController);
}());