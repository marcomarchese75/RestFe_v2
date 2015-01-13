'use strict';

/**
 * Created by marco on 13/01/2015.
 */

'use strict';
angular.module('restFeV2App')
  .factory('Patient', function ($resource) {

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

