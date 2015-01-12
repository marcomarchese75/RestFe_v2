'use strict';

/**
 * @ngdoc function
 * @name restFeV2App.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the restFeV2App
 */
angular.module('restFeV2App')
  .controller('TableCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.allPatientsData = MainSrvc.query();

  });
