'use strict';

 /**
 * @ngdoc function
 * @name restFeV2App.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the restFeV2App
 */

  angular.module('restFeV2App')
  .controller('TableCtrl', function($scope, $timeout, MainSrvc) {
  $scope.allPatientsData = MainSrvc.query();
});
