angular.module('starter')
.controller('TabController', function($scope, $ionicHistory, $ionicNavBarDelegate) {

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $scope.setNavTitle = function(title) {
      $ionicNavBarDelegate.title(title);
    }
})
