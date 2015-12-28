var app = angular.module('scratch', ['ui.router', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state("home", {
    url: '/',
    template: "<h1>HELLO!</h1>",
    controller: 'chat'
  });
});

app.controller('chat', ['$scope', function($scope) {
  console.log('hello world');
}]);
