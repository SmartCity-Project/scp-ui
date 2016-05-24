'use strict';
angular.module('app.services.voteService', [])
.factory('VoteService', function ($http, APP_CONFIG, Domain, TokenStorage) {

    var service = {

        vote: function(documentType, documentId, voteType, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/'+ documentType +'/votes';
            var voteData = {"documentId": documentId, "type": voteType};
        	var postData = angular.toJson(voteData);
                        
        	var config = {
        		headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.post(url, postData, config).then(
              function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {
                console.log(response);
      	  });
        },
    
	    getAggregatedVotes: function(documentType, documentId, callback) {
	    	
	    	var url = APP_CONFIG.apiHostUrl + '/api/crud/'+ documentType +'/votes/getAggregatedVotes';
	    	var postData = angular.toJson(documentType);
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
	    }

    };

    return service;
});