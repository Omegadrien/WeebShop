angular.module('starter')
.controller('DirectoryController', function($scope, $http, $ionicLoading, $stateParams, $location) {

    $scope.showElements = false;

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {
        $http({
            url: "/api/directory/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.directory = response.data;
            $scope.showElements = true;
            $ionicLoading.hide();
        }, function fail(response) {

        })
    });

    $scope.buttonClicked = function (contentId) {
        $location.path('/game/' + contentId);
    }

})
