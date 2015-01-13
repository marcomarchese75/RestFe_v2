/**
 * Created by marco on 09/01/2015.
 */

'use strict';
angular.module('restFeV2App')
  .factory('MainSrvc', function ($resource) {

    return $resource('http://localhost:18080/RestBeV2/webresources/rest/patient/:id',{id:'@_id'}, {
      getData: {
        method:'GET',
        isArray: true
      },
      postData: {
        method:'POST'
      }
    });
  });
