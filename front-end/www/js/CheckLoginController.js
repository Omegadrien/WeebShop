angular.module('starter')
.controller('CheckLoginController', function($scope, $http, $ionicLoading, $location) {

    $scope.boolGoToLogin = true;
    $scope.showTab = false;

    $scope.goToLogin = function () {
        if ($scope.boolGoToLogin) {
            $location.path('/login');
        }
        else {
            $scope.showTab = true;
            $location.path('/home');
        }

    }

    $scope.goToLogin();


})
