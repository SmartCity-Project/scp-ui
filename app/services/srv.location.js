'use strict';

angular.module('app.services.locationService', []);

angular.module('app.services.locationService')
.factory('LocationService', function ($http, APP_CONFIG, Domain, TokenStorage) {
	var service = {

		findSimilar: function(locationName, withCoordinates, callback) {	
	    	var url = APP_CONFIG.apiHostUrl + '/api/locations/find?name=' + locationName +'&withCoordinates='+withCoordinates;
	    	var config = {
	    		headers: {
	               'X-Auth-Token': TokenStorage.retrieve()
	            }
	        };
	        return $http.get(url, config).then(
	          function successCallback(response) {
	        	  callback(response);
	      	  }, function errorCallback(response) {

	  	  });
	    },

	    find: function(geojsonPoint, callback) {	
	    	var url = APP_CONFIG.apiHostUrl + '/api/locations/find';
            var postData = angular.toJson(geojsonPoint);
	    	var config = {
	    		headers: {
	               'X-Auth-Token': TokenStorage.retrieve()
	            }
	        };
	        return $http.post(url, postData, config).then(
	          function successCallback(response) {
	        	  callback(response);
	      	  }, function errorCallback(response) {

	  	  });
	    },
            
        getAll: function(withCoordinates, callback) { 	
	    	var url = APP_CONFIG.apiHostUrl + '/api/locations/getAll?withCoordinates='+withCoordinates;
	    	var config = {
	    		headers: {
	               'X-Auth-Token': TokenStorage.retrieve()
	            }
	        };
	        return $http.get(url, config).then(
	          function successCallback(response) {
	        	  callback(response);
	      	  }, function errorCallback(response) {

	  	  });
	    }    
	};

	return service;
});