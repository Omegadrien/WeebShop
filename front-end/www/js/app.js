// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic-ratings'])

.factory('sessionService',['$http',function($http){
return {
   set: function(key,value){
      return localStorage.setItem(key,JSON.stringify(value));
   },
   get: function(key){
     return JSON.parse(localStorage.getItem(key));
   },
   destroy: function(key){
     return localStorage.removeItem(key);
   },
 };
}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
        .state('home', {
            url:"/",
            templateUrl:'templates/home.html'
        })
        .state('login', {
            url:'/login',
            templateUrl: 'templates/user/login.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/user/register.html'
        })
        .state('search', {
            url:'/search',
            templateUrl: 'templates/search.html'
        })
        .state('settings', {
            url: '/settings',
            cache: false,
            templateUrl: 'templates/settings.html'
        })
        .state('directory', {
            url: '/directory/:id',
            templateUrl: 'templates/directory.html'
        })
        .state('game', {
            url: '/game/:id',
            templateUrl: 'templates/game.html'
        })
        .state('gameList', {
            url: '/gameList/:url',
            templateUrl: 'templates/gameList.html'
        })
        .state('otherwise', {
            url: '/',
            templateUrl: 'templates/home.html'
        })

})
