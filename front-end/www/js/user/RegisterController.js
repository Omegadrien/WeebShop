angular.module('starter')
.controller('RegisterController', function($scope, $http, $location) {

    var register = function() {
        $http({
            url: "/api/user/register",
            method: "POST",
            headers: {"Content-Type":"application/json"},
            data: {'username':$scope.usernameSelect,'email':$scope.emailSelect, 'password':$scope.passwordSelect}

        }).then(function success (response) {
            $location.path('/home');

        }, function fail(response) {
            console.log("fail: " + response.data.message);
        })
    }

    $scope.registerButtonClicked = function() {
        if (typeof $scope.usernameSelect != 'undefined' && typeof $scope.passwordSelect != 'undefined') {
            register();
        }
    }

})
