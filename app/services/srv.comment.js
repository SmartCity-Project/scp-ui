'use strict';
angular.module('app.services.commentService', [])
.factory('CommentService', function ($http, APP_CONFIG, Domain, TokenStorage) {

    var service = {
        
    	saveComment: function(commentText, discussionId, documentType, callback) {
            
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/'+ documentType +'/comments';
            
            var commentJson = {"data": commentText, "documentId": discussionId};
        	var postData = angular.toJson(commentJson);
            
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
    
        deleteComment: function(documentType, documentId, callback) {
	    	
	    	var url = APP_CONFIG.apiHostUrl + '/api/crud/'+ documentType +'/comments/';
	    	var postData = angular.toJson(documentType);
	    	var config = {
	    		headers: {
	               'X-Auth-Token': TokenStorage.retrieve()
	            }
	        };
	        return $http.delete(url, config, postData).then(
	          function successCallback(response) {
	        	  callback(response);
	      	  }, function errorCallback(response) {
	
	  	  });
	    },
	    
	    find: function(documentType, discussionId, callback) {
	    	var url = APP_CONFIG.apiHostUrl + '/api/crud/'+ documentType +'/comments/find?discussionId='+discussionId;

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
        
        getAggregatedComments: function(documentType, documentId, callback) {
            var url = APP_CONFIG.apiHostUrl + '/api/crud/'+ documentType +'/comments/getAggregatedComments/'+documentId;

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