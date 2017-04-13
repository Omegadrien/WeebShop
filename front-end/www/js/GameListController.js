angular.module('starter')
.controller('GameListController', function($scope, $http, $ionicLoading, $stateParams, $location, $q) {

    $scope.showElements = false;
    $scope.games = {};
    $scope.gamesContentBefore = [];

    var getGamesList = function(offset) {
        $http({
            url: "/api/games?offset=" + offset + $stateParams.url,
            method: "GET"
        }).then(function success (response) {
            $scope.games = response.data;

            //inject games before
            $scope.games.content = $scope.gamesContentBefore.concat($scope.games.content);

            $scope.showElements = true;
            $ionicLoading.hide();
        }, function fail(response) {

        })
    }

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(getGamesList(0));

    $scope.buttonClicked = function (contentId) {
        $location.path('/game/' + contentId);
    }

    $scope.moreDataCanBeLoaded = function () {
        if ($scope.showElements && $scope.games.content.length + $scope.games.length < $scope.games.total) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.loadMoreData = function() {
        $scope.gamesContentBefore = $scope.games.content;

        setTimeout(function(){ //setTimeout to 1s, to display the loading when loading ionInfiniteScroll
            $q.all([getGamesList($scope.games.content.length + $scope.games.length)]).then( function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }, 1000);



    }

})
