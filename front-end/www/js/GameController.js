angular.module('starter')
.controller('GameController', function($scope, $http, $ionicLoading, $stateParams) {

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {

        $http({
            url: "/api/game/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.game = response.data;
        }, function fail(response) {

        });

        $http({
            url: "/api/game/price/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.price = response.data;
        }, function fail(response) {

        });

        $http({
            url: "/api/download/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.downloadUrl = response.data;
        }, function fail(response) {

        });


        // to do later -> hide the loading when
        $ionicLoading.hide().then(function(){
           //console.log("The loading indicator is now hidden");
        });


    });

    $scope.goToDownloadPage = function() {
        window.open($scope.downloadUrl);
    }

})
