'use strict';
angular
    .module("ionicApp")
    .controller('Connect', Connect);

Connect.$inject = ['$ionicPlatform', '$scope', '$cordovaBluetoothSerial', '$stateParams', 'btService']; 

function Connect($ionicPlatform, $scope, $cordovaBluetoothSerial, $stateParams,  btService) {
   
    $scope.conneccion = btService.get($stateParams.id);
     
    $ionicPlatform.ready(function () {
        $cordovaBluetoothSerial.isEnabled().then(function () {
            $cordovaBluetoothSerial.connect($scope.conneccion.id).then(
                    function (data) {
                        $scope.stateNotification = "Conectado";
                    },
                    function (data) {
                        $scope.stateNotification = "Error" + data;
                    });
        });
    });
    
 
    $scope.send = function (data) {
        $ionicPlatform.ready(function () {
            $cordovaBluetoothSerial.write(data + '\n').then(function (result) {
                alert("Enviado Correctamente!!!");
            },
            function (error) {
                alert(error);
            });
        });
    };

};