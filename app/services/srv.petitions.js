'use strict';

angular.module('app.services.petitionService', []);

angular.module('app.services.petitionService')
       .factory('PetitionService', function ($http, APP_CONFIG, Domain, TokenStorage) {
	
    var service = {

        searchPetitions: function(PetitionSearchCriteria, pageIndex, pageSize, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/petitions/find?pageIndex='+pageIndex+'&pageSize='+pageSize;
        	var postData = angular.toJson(PetitionSearchCriteria);
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
        
        sign: function(id, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/petitions/sign';
        	var postData = angular.toJson({"petitionId":id});
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
        
        getPetition: function(id, callback) {
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/petitions/find?id='+id;
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
        
        removePetition: function(id, callback) {
            var url = APP_CONFIG.apiHostUrl + '/api/crud/petitions/'+id;

        	var config = {
        		headers:  {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.delete(url, config).then(
                function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },

        savePetition: function(petition, callback) {
            var url = APP_CONFIG.apiHostUrl + '/api/crud/petitions';
        	var postData = angular.toJson(petition);

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
        
        count: function(callback) {
        
            var url = APP_CONFIG.apiHostUrl + '/api/crud/petitions/total';
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