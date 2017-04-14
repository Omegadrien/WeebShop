angular.module('starter')
.controller('CheckLoginController', function($scope, $http, $ionicLoading, $location, sessionService) {

    $scope.goToLogin = function () {
        if (sessionService.get("token") === null) {
            $location.path('/login');
        }
    }

    $scope.goToLogin();

})
