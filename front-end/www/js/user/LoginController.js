angular.module('starter')
.controller('LoginController', function($scope, $http, $location, $ionicLoading, $ionicPopup, sessionService) {

    var login = function() {
        $http({
            url: "/api/user/login",
            method: "POST",
            headers: {"Content-Type":"application/json"},
            data: {'username':$scope.usernameSelect, 'password':$scope.passwordSelect}

        }).then(function success (response) {
            sessionService.set("token", response.data.token);
            $location.path('/home');

        }, function fail(response) {
            $ionicPopup.alert({
             title: 'Error',
             template: response.data.message
           });

        })
    }

    $scope.loginButtonClicked = function() {
        login();
    }

    $scope.registerGoButtonClicked = function() {
        $location.path('/register');
    }

})
