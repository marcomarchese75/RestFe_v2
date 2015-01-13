'use strict';

/**
 * @ngdoc function
 * @name restFeV2App.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the restFeV2App
 */

angular.module('restFeV2App')
  .controller('TableCtrl', function($scope, $timeout, MainSrvc, $filter,  ngTableParams) {
    $scope.allPatientsData = MainSrvc.query();

    console.log("Valori contenuti in $scope.allPatientsData in TableCtrl...");
    console.log(JSON.stringify($scope.allPatientsData));

    $scope.patients = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        ass_nome: 'asc'     // initial sorting
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
