'use strict';

/**
 * @ngdoc function
 * @name restFeV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restFeV2App
 */
angular.module('restFeV2App')
  .controller('MainCtrl', function ($scope, $timeout, MainSrvc) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.ass_ipca = null;
    $scope.hash = "";
    var payload = {};

    // ok
    $scope.allPatientsData = MainSrvc.query();

    //console.log(JSON.stringify($scope.allPatientsData));

    // ok
    $scope.reverse = false;
    $scope.click = function (name) {
      $scope.sort = name;
      $scope.reverse = !$scope.reverse;
    }

    // ok
    $scope.deletedRecord = false;
    $scope.removeItem = function (id) {
      MainSrvc.remove({id: id}, function(){
        $scope.deletedRecord = true;
        $scope.allPatientsData = MainSrvc.query();
        $timeout(function () {
          $scope.deletedRecord = false;
        }, 5000);
      }, function(){
        $scope.deletedRecord = false;
        $scope.allPatientsData = MainSrvc.query();
      });
    }

    $scope.insertedNewRecord = false;
    $scope.createOrUpdate = function () {
      var payload = {
        "ass_cogn": $scope.ass_cogn,
        "ass_nome": $scope.ass_nome,
        "ass_tel": $scope.ass_tel,
        "ass_email": $scope.ass_email
      };
      if($scope.ass_ipca != null)
        payload.ass_ipca= $scope.ass_ipca;

      console.log(JSON.stringify(payload));

      $scope.allPatientsData.push(payload);
      // commento provvisoriamente
      /*$scope.ass_email = null;
       $scope.ass_nome = null;
       $scope.ass_cogn = null;
       $scope.ass_tel = null;*/

      //console.log(JSON.stringify($scope.allPatientsData));
    }

    $scope.saveOnDB = function (data) {
      var payload = {
        "ass_ipca": $scope.ass_ipca,
        "ass_cogn": $scope.ass_cogn,
        "ass_nome": $scope.ass_nome,
        "ass_tel": $scope.ass_tel,
        "ass_email": $scope.ass_email
      };
      console.log(JSON.stringify(payload));
      MainSrvc.postData({},  payload,//$scope.allPatientsData,
        function (data) {
          $scope.allPatientsData = MainSrvc.query();
          $scope.insertedNewRecord = true;

          $timeout(function () {
            $scope.insertedNewRecord = false;
          }, 5000);
        }
      );
    }

    $scope.editRecord = false;
    $scope.edit = function () {
      //http://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
      var i = arrayObjectIndexOf($scope.allPatientsData, $scope.hash, "$$hashKey");
      console.log("Indice: "+ i);
      $scope.allPatientsData.splice(i, 1); //rimuovo l'elemento
      $scope.createOrUpdate(); //lo aggiungo ex-novo
      $scope.editRecord = false;
      // commento provvisoriamente
      //$scope.ass_ipca = null;
    }

    $scope.editRecord = false;
    $scope.editItem = function (data) {
      var payload = {
        "ass_ipca": data.ass_ipca,
        "ass_cogn": data.ass_cogn,
        "ass_nome": data.ass_nome,
        "ass_tel": data.ass_tel,
        "ass_email": data.ass_email
      };
      $scope.ass_ipca = data.ass_ipca;
      $scope.hash =  data.$$hashKey;
      $scope.editRecord = true;
      $scope.ass_cogn = data.ass_cogn;
      $scope.ass_nome = data.ass_nome;
      $scope.ass_tel= data.ass_tel;
      $scope.ass_email=data.ass_email;

      console.log("HASH:" + $scope.hash);
      //console.log(JSON.stringify($scope.allPatientsData));
    }

    function arrayObjectIndexOf(myArray, searchTerm, property) {
      for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
      }
      return -1;
    }

  });
