angular.module('starter')
.controller('SettingsController', function($scope, $http, $ionicLoading, $location, $state, sessionService) {

    $scope.token = sessionService.get("token");

    $http({
        url: "/api/user/secret/gameList",
        method: "GET",
        headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token},
        data: {'username':$scope.usernameSelect, 'password':$scope.passwordSelect}

    }).then(function success (response) {
        $scope.listGames = response.data;
        console.log($scope.listGames.length);


    }, function fail(response) {
        console.log("fail: " + response.data.message);
    })

    $scope.logoutButtonClicked = function() {
        //logout
        sessionService.destroy("token");
        window.location.reload();
    }

    $scope.buttonClicked = function (contentId) {
        console.log("contentId=" + contentId);
        $location.path('/game/' + contentId);
    }

})
