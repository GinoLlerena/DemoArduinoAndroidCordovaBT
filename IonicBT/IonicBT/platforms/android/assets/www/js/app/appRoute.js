'use strict';
angular
    .module("ionicApp")
    .config(config);

function config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: 'js/app/html/home.html',
          controller: 'MainCtrl'
      })
      .state('disconnect', {
            url: '/disconnect',
            templateUrl: 'js/app/html/disconnect.html',
            controller: 'DisconnectCtrl'
        })
     .state('tabs', {
         url: '/tab',
         abstract: true,
         templateUrl: 'js/app/html/tabs.html'
     })
          .state('tabs.connect', {
              url: '/connect/{id}',
              views: {
                  'connect': {
                      templateUrl: 'js/app/html/connect.html',
                      controller: 'Connect'
                  }
              }
          })

          .state('tabs.about', {
              url: '/about',
              views: {
                  'about': {
                      templateUrl: 'js/app/html/about.html'
                  }
              }
          });

    $urlRouterProvider.otherwise('/home');

};