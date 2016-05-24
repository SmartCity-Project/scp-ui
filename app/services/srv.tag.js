'use strict';

angular.module('app.services.tagService', []);

angular.module('app.services.tagService')
.factory('TagService', function ($http, APP_CONFIG, Domain, TokenStorage) {
	var service = {

		saveTag: function(Tag, callback) {
	        	
	    	var url = APP_CONFIG.apiHostUrl + '/api/tags';
	    	var postData = angular.toJson(Tag);
	    	var config = {
	    		headers: {
	               'X-Auth-Token': TokenStorage.retrieve()
	            }
	        };
	        return $http.post(url, config, postData).then(
	          function successCallback(response) {
	        	  callback(response);
	      	  }, function errorCallback(response) {

	  	  });
	    },

	    find: function(tagName, callback) {
	        	
	    	var url = APP_CONFIG.apiHostUrl + '/api/tags/find?name=' + tagName;

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