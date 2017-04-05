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
            $ionicLoading.hide().then(function(){
               //console.log("The loading indicator is now hidden");
            });
        }, function fail(response) {

        })
    });

})
