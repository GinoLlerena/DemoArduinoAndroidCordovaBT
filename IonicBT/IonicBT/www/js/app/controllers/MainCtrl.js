'use strict';
angular
    .module("ionicApp")
    .controller('MainCtrl',MainCtrl);

MainCtrl.$inject = ['$ionicPlatform', '$scope', '$cordovaBluetoothSerial', '$state', '$timeout', 'btService'];

function MainCtrl($ionicPlatform, $scope, $cordovaBluetoothSerial, $state,  $timeout, btService) {

    var verify = function () {
        $ionicPlatform.ready(function () {
            $cordovaBluetoothSerial.isEnabled().then(
                    function () {
                        $scope.listBT = btService.all();
                        $scope.btBluehTooh = true;
                        console.log("Encendido");
                    },
                    function () {
                        $scope.btBluehTooh = false;
                        console.log("Apagado");
                    });
        });
        $timeout(verify, 3000);
    }

    $scope.listar = function () {
        var promise = btService.all();
        promise.then(function (data) {
            $scope.listBT = data;
        },
             function (errorPl) {
                 alert(errorPl);
             });
    };

    $timeout(verify, 3000);
  
};