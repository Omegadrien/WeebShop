angular.module('starter')
.controller('SettingsController', function($scope, $http, $ionicLoading, $location, $state, $q, $ionicPopup, sessionService) {

    $scope.token = sessionService.get("token");
    $scope.showElements = false;
    $scope.isAdmin = false;

    var getIsAdmin = function () {
        $http({
        url: "/api/user/secret/isAdmin",
        method: "GET",
        headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token}

        }).then(function success (response) {
            $scope.isAdmin = response.data.isAdmin;
            console.log("isAdmin= " + $scope.isAdmin);


            console.log("hello " + $scope.isAdmin);
            if ($scope.isAdmin == true) {
                console.log("enter in is admin function...");
                getUserList();
            }
            else {
                getUserGameList();
            }



        }, function fail(response) {
            console.log("fail get isAdmin " + response.data);
            $scope.showElements = true;
            $ionicLoading.hide();
        })
    }

    var getUserGameList = function () {
        $http({
        url: "/api/user/secret/gameList",
        method: "GET",
        headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token}

        }).then(function success (response) {
            $scope.listGames = response.data;

            $scope.showElements = true;
            $ionicLoading.hide();

        }, function fail(response) {
            console.log("fail: totoland, maybe the user is unlogged..." + response.data.message);
            $ionicLoading.hide();
        })
    }

    var getUserList = function() {
        $http({
            url: "api/user/secret/admin/getUserList",
            method: "GET",
            headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token}
        }).then(function success (response) {
            $scope.userList = response.data;

            console.log("getUserList= " + $scope.userList.length);

            $scope.showElements = true;
            $ionicLoading.hide();

        }, function fail(response) {
            console.log("fail admin getUserList");
            $ionicLoading.hide();
        })
    }

    var deleteUser = function(id) {
        $http({
            url: "api/user/secret/admin/deleteUser",
            method: "POST",
            headers: {"Content-Type":"application/json", "Authorization":"JWT " + $scope.token},
            data: {"id": id}
        }).then(function success (response) {
            $ionicPopup.alert({
                title: 'Success',
                template: 'That account have been disabled with success!'
           });

            getUserList();

        }, function fail(response) {
            $ionicPopup.alert({
                title: 'Error',
                template: 'Fail to disable the account.'
           });
        })
    }

    $ionicLoading.show({
        template:'<ion-spinner icon="spiral"></ion-spinner>',
    }).then(function() {

        getIsAdmin();
    });


    $scope.logoutButtonClicked = function() {
        //logout
        sessionService.destroy("token");
        window.location.reload();
    }

    $scope.buttonClicked = function (contentId) {
        $location.path('/game/' + contentId);
    }

    // confirm if disable account
     $scope.showConfirm = function(id) {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Confirmation',
         template: 'Are you sure you want to disable this account?'
       });

       confirmPopup.then(function(res) {
           if(res) {
               deleteUser(id);
           }
       });
     };

    $scope.buttonDisableClicked = function (id) {
         $scope.showConfirm(id);
    }

})
