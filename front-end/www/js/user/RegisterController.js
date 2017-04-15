angular.module('starter')
.controller('RegisterController', function($scope, $http, $location, $ionicPopup) {

    var register = function() {
        $http({
            url: "/api/user/register",
            method: "POST",
            headers: {"Content-Type":"application/json"},
            data: {'username':$scope.usernameSelect,'email':$scope.emailSelect, 'password':$scope.passwordSelect}

        }).then(function success (response) {

            $ionicPopup.alert({
                title: 'Success',
                template: 'Your account is now registered!'
           });

            $location.path('/home');

        }, function fail(response) {
            $ionicPopup.alert({
                title: 'Error',
                template: response.data.message
           });

        })
    }

    $scope.registerButtonClicked = function() {
        if (typeof $scope.usernameSelect != 'undefined' && typeof $scope.passwordSelect != 'undefined') {
            register();
        }
        else {
            $ionicPopup.alert({
                title: 'Error',
                template: 'Please, enter a username and a password. The email is optional.'
           });
        }
    }

})
