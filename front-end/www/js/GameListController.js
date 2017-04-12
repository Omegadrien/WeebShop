angular.module('starter')
.controller('GameListController', function($scope, $http, $ionicLoading, $stateParams, $location) {

    //uncomment
    // http://codepen.io/elm/pen/Becqp
    // http://ionicframework.com/docs/v1/api/directive/ionInfiniteScroll/

    $scope.offset = 0;
    $scope.total = 0;

    $scope.showElements = false;

    var getGamesInfo = function(offset) {
        $http({
            url: "/api/games?offset=" + offset + $stateParams.url,
            method: "GET"
        }).then(function success (response) {
            $scope.games = response.data;
            $scope.offset = $scope.games.offset;
            $scope.total = $scope.games.total;
            $scope.showElements = true;
            $ionicLoading.hide();
        }, function fail(response) {

        })
    }


    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(getGamesInfo($scope.offset));

    $scope.buttonClicked = function (contentId) {
        $location.path('/game/' + contentId);
    }


    $scope.moreDataCanBeLoaded = function () {
        if ($scope.offset + $scope.games.length < $scope.total) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.loadMoreData = function() {
        console.log("bottom reached. Load more..");
        $scope.offset += $scope.games.length;
        getGamesInfo($scope.offset);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }

})
