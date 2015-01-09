/**
 * Created by marco on 09/01/2015.
 */

'use strict';
angular.module('restFeV2App')
  .factory('MainSrvc', function ($resource) {

    return $resource('http://localhost:18080/RestBE/webresources/rest/patient/:id',{id:'@_id'}, {
      getData: {
        method:'GET',
        isArray: false
      },
      postData: {
        method:'POST'
      }
    });
  });
