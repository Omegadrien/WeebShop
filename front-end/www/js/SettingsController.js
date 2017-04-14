angular.module('starter')
.controller('SettingsController', function($scope, $http, $ionicLoading, $location, $state, sessionService) {

    $scope.token = sessionService.get("token");

    $scope.logoutButtonClicked = function() {
        //logout
        sessionService.destroy("token");
        window.location.reload();
    }

})
