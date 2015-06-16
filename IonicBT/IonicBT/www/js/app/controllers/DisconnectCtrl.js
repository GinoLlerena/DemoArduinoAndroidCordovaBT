'use strict';
angular
    .module("ionicApp")
    .controller('DisconnectCtrl', DisconnectCtrl);

DisconnectCtrl.$inject = ['$ionicPlatform', '$scope', '$cordovaBluetoothSerial', '$stateParams'];

function DisconnectCtrl($ionicPlatform, $scope, $cordovaBluetoothSerial, $stateParams) {

    $ionicPlatform.ready(function () {
        $cordovaBluetoothSerial.disconnect().then(
            function (data) {
                $scope.stateNotification = "Desconectado";
            },
            function (data) {
                $scope.stateNotification = "Error:" + data;
            });
    });
       
    $scope.salir = function () {
        ionic.Platform.exitApp();
    };
};