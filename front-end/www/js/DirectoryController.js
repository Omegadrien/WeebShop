angular.module('starter')
.controller('DirectoryController', function($scope, $http, $stateParams) {

    $http({
        url: "/api/directory/"+$stateParams.id,
        method: "GET"
    }).then(function success (response) {
        $scope.directory = response.data;
    }, function fail(response) {

    })

})
