angular.module('starter')
.controller('SearchController', function($scope, $http, $ionicLoading, $location) {

    $http({
        url: "/api/publishersList",
        method: "GET"
    }).then(function success (response) {
        $scope.publishers = response.data;
    }, function fail(response) {

    })


    $scope.resetButtonClicked = function() {
        $scope.platformSelect="0";
        $scope.genreSelect="0";
        $scope.publisherSelect="0";
        $scope.keywordSelect="";
        $scope.minPriceSelect="";
        $scope.maxPriceSelect="";
        $scope.sortSelect="new";
    }

    $scope.startSearchButtonClicked = function() {

        var url = "";

        // keywordSelect
        if (typeof $scope.keywordSelect != "undefined" && $scope.keywordSelect != "") {
            url += "&word=" + $scope.keywordSelect;
        }

        // platformSelect
        if ($scope.platformSelect != "0") {
            url += "&platform=" + $scope.platformSelect;
        }

        // genreSelect
        if ($scope.genreSelect != "0") {
            url += "&genre=" + $scope.genreSelect;
        }

        // publisherSelect
        if ($scope.publisherSelect != "0") {
            url += "&publisher=" + $scope.publisherSelect;
        }

        //min price
        if (parseInt($scope.minPriceSelect)) {
            var number = parseInt($scope.minPriceSelect);
            if (number >= 0) {
                url += "&priceMin=" + number;
            }
        }

        //max price
        if (parseInt($scope.maxPriceSelect) || parseInt($scope.maxPriceSelect) == 0) {
            var number = parseInt($scope.maxPriceSelect);
            if (number >= 0) {
                url += "&priceMax=" + number;
            }
        }

        // sort
        if ($scope.sortSelect == "new" ||
            $scope.sortSelect == "popular" ||
            $scope.sortSelect == "score") {

                url += "&sort=" + $scope.sortSelect;
        }

        //send url
        $location.path('/gameList/' + url);

    }

})
