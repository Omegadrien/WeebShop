angular.module('starter')
.controller('GameListController', function($scope, $http, $ionicLoading, $stateParams, $location) {

    $scope.offset = 0;
    $scope.total = 0;

    $scope.showElements = false;

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {
        $http({
            url: "/api/games"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.games = response.data;
            $scope.offset = $scope.games.offset;
            $scope.total = $scope.games.total; 
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
