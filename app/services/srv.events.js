'use strict';
angular.module('app.services.eventService', [])
.factory('EventService', function ($http, Domain, TokenStorage, APP_CONFIG, Security) {

    var service = {

        searchEvents: function(EventSearchCriteria, pageIndex, pageSize, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/events/find?pageIndex='+pageIndex+'&pageSize='+pageSize;
        	var postData = angular.toJson(EventSearchCriteria);
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
        
        getEvent: function(id, callback) {
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/events/find?id='+id;
        	var config = {
        		headers:  {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.get(url, config).then(
                function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
        
        getEventStates: function(callback) {
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/events/states';
        	var config = {
        		headers:  {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.get(url, config).then(
                function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },

        createEvent: function(event, callback) {
            var url = APP_CONFIG.apiHostUrl + '/api/crud/events'
        	var postData = angular.toJson(event);

        	var config = {
        		headers:  {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.post(url, postData, config).then(
                function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
        
        edit: function(eventId, eventState, callback) {
            var url = APP_CONFIG.apiHostUrl + '/api/crud/events/edit?eventId='+eventId+'&eventState='+eventState;
        	var config = {
        		headers:  {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.post(url, config).then(
                function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
        
        participate: function(eventId, callback) {
            var orgId = Security.currentUser.organizationId;
            var url = APP_CONFIG.apiHostUrl + '/api/crud/events/participate?orgId='+orgId+'&eventId='+eventId;
        	var config = {
        		headers:  {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.get(url, config).then(
                function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
        
        count: function(callback) {
        
            var url = APP_CONFIG.apiHostUrl + '/api/crud/events/total';
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