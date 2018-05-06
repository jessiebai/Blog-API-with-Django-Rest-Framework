'use strict';

angular.module('loginDetail').
    component('loginDetail', {
        templateUrl: '/api/templates/login-detail.html', //call template from django url
        controller: function($http, $location, $routeParams, $rootScope, $scope){
        var loginUrl = '/api/auth/token/'
        $scope.user = {

        }
        $scope.doLogin = function(user) {
           console.log(user)
        }
        }
      })
