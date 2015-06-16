'use strict';
angular
    .module("ionicApp")
    .factory('btService', btService);

btService.$inject = ['$ionicPlatform', '$cordovaBluetoothSerial'];

function btService ($ionicPlatform, $cordovaBluetoothSerial) {

    var listBT = [];

    $ionicPlatform.ready(function () {
        $cordovaBluetoothSerial.list().then(function (result) {
            listBT = result;
        },
        function (error) {
            console.log(error);
        });
    });


    return {
        all: function () {
            return listBT;
        },
        get: function (id) {
            var list = [];
            angular.forEach(listBT, function (item, index) {
                var newItem = new Object();
                if (item.id == id) {
                    newItem.id = item.id;
                    newItem.address = item.address;
                    newItem.name = item.name;
                    newItem.index = index;
                    list.push(newItem);
                }
            })

            return list[0];
        }
    };
};