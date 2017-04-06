angular.module('starter')
.controller('GameController', function($scope, $http, $ionicLoading, $stateParams, $q) {

    $scope.showRating = false;

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {

        var reqGame = $http({
            url: "/api/game/"+$stateParams.id,
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

        $q.all([reqGame, reqPrice, reqDownload]).then( function() {
            $ionicLoading.hide().then(function(){
               //console.log("The loading indicator is now hidden");
            });

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


    $scope.goToDownloadPage = function() {
        window.open($scope.downloadUrl);
    }

})
