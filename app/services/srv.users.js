'use strict';
angular.module('app.services.userService', [])
.factory('UserService', function ($http, APP_CONFIG, Domain, TokenStorage) {

    var service = {

        findUserById: function(userId, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/users/'+userId;

            var config = {
        		headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.get(url, config).then(
              function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {
                console.log(response);
      	  });
        },
        
        count: function(callback) {
        
            var url = APP_CONFIG.apiHostUrl + '/api/crud/users/total';
            var config = {
        		headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
         
            return $http.get(url, config).then(
              function successCallback(response) {
            	  callback(response.data.total);
	      	  }, function errorCallback(response) {
                console.log(response);
      	  });
        
        }

    };

    return service;
});