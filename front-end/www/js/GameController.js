angular.module('starter')
.controller('GameController', function($scope, $http, $ionicLoading, $stateParams, $q, $ionicPopup, sessionService) {

    $scope.showElements = false;
    $scope.showRating = false;
    $scope.isWishListed = false;
    $scope.token = sessionService.get("token");

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {

        var reqGame = $http({
            url: "/api/game/"+ $stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.game = response.data;

            if (typeof $scope.game.starRatingInfo != 'undefined') {
                $scope.ratingsObject.rating = Math.round($scope.game.starRatingInfo.score); //Bug with star rating if float number
                $scope.showRating = true;
            }

        }, function fail(response) {

        });

         var reqPrice = $http({
            url: "/api/game/price/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.price = response.data;
        }, function fail(response) {

        });

        var reqDownload = $http({
            url: "/api/download/"+$stateParams.id,
            method: "GET"
        }).then(function success (response) {
            $scope.downloadUrl = response.data;
        }, function fail(response) {

        });

        var checkIfGameIsWishListed = function () {
            $http({
            url: "/api/user/secret/gameList",
            method: "GET",
            headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token}

            }).then(function success (response) {
                $scope.listGames = response.data;

                for (var index = 0; index < $scope.listGames.length; index++) {
                    if ($scope.listGames[index][1] == $stateParams.id) {
                        $scope.isWishListed = true;
                        break;
                    }
                }


            }, function fail(response) {
                console.log("fail, maybe the user is unlogged..." + response.data.message);
            })
        }

        $q.all([reqGame, reqPrice, reqDownload, checkIfGameIsWishListed()]).then( function() {
            $scope.showElements = true;
            $ionicLoading.hide();
        });

    });

    $scope.ratingsObject = {
       iconOn: 'ion-ios-star',    //Optional
       iconOff: 'ion-ios-star-outline',   //Optional
       iconOnColor: 'rgb(200, 200, 100)',  //Optional
       iconOffColor:  'rgb(000, 000, 000)',    //Optional
       rating:  2, //Optional
       minRating:1,    //Optional
       readOnly: true, //Optional
       callback: function(rating, index) {    //Mandatory
         $scope.ratingsCallback(rating, index);
       }
     };

     $scope.addToGameList = function () {
         $http({
         url: "/api/user/secret/gameList/add",
         method: "POST",
         headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token},
         data: {'name': $scope.game.name, 'id': $stateParams.id}

         }).then(function success (response) {
             $scope.isWishListed = true;
             $ionicPopup.alert({
                 title: 'Success',
                 template: response.data
            });

         }, function fail(response) {
             console.log("error, unable to add to gameList...");
         })
     }

     $scope.removeFromGameList = function () {
         $http({
         url: "/api/user/secret/gameList/remove",
         method: "POST",
         headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token},
         data: {'id': $stateParams.id}

         }).then(function success (response) {
             $scope.isWishListed = false;
             $ionicPopup.alert({
                 title: 'Success',
                 template: response.data
            });

         }, function fail(response) {
             console.log("error, unable to remove from gameList...");
         })
     }


    $scope.goToDownloadPage = function() {
        window.open($scope.downloadUrl);
    }

    $scope.watchVideo = function(url) {
        window.open(url);
    }

    $scope.seeImage = function(url) {
        window.open(url);
    }

})
