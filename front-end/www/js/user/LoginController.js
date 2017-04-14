angular.module('starter')
.controller('LoginController', function($scope, $http, $ionicLoading, $location) {

    var login = function() {
        $http({
            url: "/api/user/login",
            method: "POST",
            headers: {"Content-Type":"application/json"},
            data: {'username':$scope.usernameSelect, 'password':$scope.passwordSelect}

        }).then(function success (response) {
            console.log(response.data.token);

        }, function fail(response) {
            console.log("fail: " + response.data.message);
        })
    }

    $scope.loginButtonClicked = function() {
        login();
    }

})
