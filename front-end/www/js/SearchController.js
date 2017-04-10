angular.module('starter')
.controller('SearchController', function($scope, $http, $ionicLoading, $location) {

    $scope.array = ['banana', 'tomato', 'pasta'];

    $http({
        url: "/api/publishersList",
        method: "GET"
    }).then(function success (response) {
        $scope.publishers = response.data;
        console.log($scope.publishers.publisher[0].name);
    }, function fail(response) {

    })

})
