'use strict';

/**
 * @ngdoc function
 * @name restFeV2App.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the restFeV2App
 */

angular.module('restFeV2App')
  .controller('TableCtrl', function($scope, $timeout, Patient, ngTableParams, $filter) {

    $scope.allPatientsData = {};

    // Retrieve all data from GET REST
    console.log("Valori contenuti in $scope.allPatientsData in TableCtrl...");
     $scope.allPatientsData = Patient.query(function() {
      console.log(JSON.stringify($scope.allPatientsData));
       console.log("Lunghezza record: "+ $scope.allPatientsData.length);
       $scope.patients = new ngTableParams({
         page: 1,            // show first page
         count: 10,          // count per page
         sorting: {
           ass_nome: 'desc'     // initial sorting
         }
       }, {
         total: $scope.allPatientsData.length, // length of data
         getData: function($defer, params) {
           // use build-in angular filter
           var orderedData = params.sorting() ?
             $filter('orderBy')($scope.allPatientsData, params.orderBy()) :
             $scope.allPatientsData;

           $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
         }
       });
    });

    // Retrieve 1 id from GET REST
    /*$scope.id = 1;
    $scope.allPatientsData = Patient.get({id:$scope.id},function() {
      console.log(JSON.stringify($scope.allPatientsData));
    });*/

    //console.log("Valori contenuti in $scope.allPatientsData in TableCtrl...");
    //console.log(JSON.stringify($scope.allPatientsData));

  });
