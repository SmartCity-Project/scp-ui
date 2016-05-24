'use strict';
angular.module('app.services.organizationService', [])
.factory('OrganizationService', function ($http, Domain, TokenStorage, APP_CONFIG) {

    var service = {
        
        editOrganizationBaseInfo: function(organization, callback) {
            
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/edit';
            var postData = angular.toJson(organization);
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
        
        getOrganizationById: function(oid, callback) {
          
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid;
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

        getOrganizationList: function(callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/list';
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
        
        saveFavoriteTag: function(oid, favTag, callback) {
          
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/favorite/tags';
            var postData = angular.toJson(favTag);
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

        getFavoriteTags: function(oid, callback) {
          
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/favorite/tags';
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
        
        removeFavoriteTag: function(oid, favTag, callback) {
            
            var postData = angular.toJson(favTag);
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/favorite/tags?tag='+favTag.name;
            var config = {
                headers: {
                       'X-Auth-Token': TokenStorage.retrieve()
                }
            };

            return $http.delete(url, postData, config).then(
              function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {

          });
        },

        saveFavoriteLocation: function(oid, favLocation, callback) {
        	
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/favorite/locations';
            var postData = angular.toJson(favLocation);
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

        getFavoriteLocations: function(oid, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/favorite/locations';
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
        
        removeFavoriteLocation: function(oid, lid, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/favorite/locations?locationId='+lid;
        	var config = {
        		headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            
            return $http.delete(url, config).then(
              function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
                
        getContacts: function(oid, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/contacts';
        	var config = {
        		headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            
            return $http.get(url, postData, config).then(
              function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
        
        saveContact: function(oid, cantact, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/contacts';
        	var postData = angular.toJson(cantact);
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
        
        deleteContact: function(oid, contactId, callback) {
        	
        	var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+oid+'/contacts/'+contactId;
            var config = {
        		headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            
            return $http.delete(url, config).then(
              function successCallback(response) {
            	  callback(response);
	      	  }, function errorCallback(response) {

      	  });
        },
        
        count: function(callback) {
        
            var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/total';
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