angular.module('starter')
.controller('DirectoryController', function($scope, $http, $ionicLoading, $stateParams) {

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {
        $http({
            url: "/api/directory/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.directory = response.data;
            $ionicLoading.hide().then(function(){
               //console.log("The loading indicator is now hidden");
            });
        }, function fail(response) {

        })
    });


})
