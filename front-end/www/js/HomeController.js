angular.module('starter')
.controller('HomeController', function($scope, $http, $ionicLoading, $location) {

    $ionicLoading.show({
          template: '<ion-spinner icon="spiral"></ion-spinner>',
        }).then(function(){
            $http({
                url: "/api/news",
                method: "GET"
            }).then(function success (response) {
                $scope.home = response.data;
                $ionicLoading.hide().then(function(){
                   //console.log("The loading indicator is now hidden");
                });
            }, function fail(response) {

            })
        });

    $scope.buttonClicked = function (directoryId) {
        console.log(directoryId);
        $location.path('/directory/'+ directoryId);
    }

})
