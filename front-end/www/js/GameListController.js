angular.module('starter')
.controller('GameListController', function($scope, $http, $ionicLoading, $stateParams, $location) {

    $scope.showElements = false;

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {
        $http({
            url: "/api/games"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.games = response.data;
            $scope.showElements = true;
            $ionicLoading.hide();
        }, function fail(response) {

        })
    });

    $scope.buttonClicked = function (contentId) {
        console.log("contentId=" + contentId);
        $location.path('/game/' + contentId);
    }

})
