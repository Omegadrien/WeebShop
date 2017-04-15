angular.module('starter')
.controller('HomeController', function($scope, $http, $ionicLoading, $location) {

    $scope.showElements = false;

    $ionicLoading.show({
          template: '<ion-spinner icon="spiral"></ion-spinner>',
        }).then(function(){
            $http({
                url: "/api/news",
                method: "GET"
            }).then(function success (response) {
                $scope.home = response.data;
                $scope.showElements = true;
                $ionicLoading.hide();

            }, function fail(response) {

            })
        });

    $scope.buttonClicked = function (directoryId) {
        $location.path('/directory/'+ directoryId);
    }

})
