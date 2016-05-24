'use strict';
angular.module('app.services.security', ['app.services.security.retryQueue', 'base64'])
.factory('Security', function ($http, $rootScope, APP_CONFIG, $base64, $q, $location, TokenStorage) {

    //var user = null;
    
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }

    //Main service calls
    var service = {
    		
        cancelLogin: function() {
            redirect();
        },
        
        register: function(UserRegister, callback) {
        	var postData = $base64.encode(angular.toJson(UserRegister));
            var url = APP_CONFIG.apiHostUrl + '/api/auth/register';

            return $http.post(url, postData).then( 
        	  function successCallback(response) {
	        	 callback(response);
	      	  }, function errorCallback(response) {

              });
        },

        login: function(email, password) {      
        	TokenStorage.clear();
            
        	var url = APP_CONFIG.apiHostUrl + '/api/auth';
            
        	$http.defaults.headers.common['Authorization'] = 
            $base64.encode(angular.toJson({username: email, password: password}));
        	
            return $http.post(url).then(function(response) {
                $http.defaults.headers.common['Authorization'] = "";
            	TokenStorage.store(response.headers('X-Auth-Token'));
                return service.requestCurrentUser().then(function(currentUser){
                    $rootScope.isAdmin = service.isAdmin();
                    return service.isAuthenticated();
                });
            });
        }, 

        logout: function(redirectTo) {
            var url = APP_CONFIG.apiHostUrl + '/api/auth/logout';
            
        	var config = {
        		headers:  {
                  'X-Auth-Token': TokenStorage.retrieve()
                }
            };
        	 
        	return $http.get(url, config).then(
        	  function successCallback(response) {
        		  
        	  }, function errorCallback(response) {
        		  TokenStorage.clear();
        		  service.currentUser = null;
        	  });
        },

        //Ask the backend to see if a user is already authenticated - this may be from a previous session.
        requestCurrentUser: function() {
            if ( service.isAuthenticated() ) {
                return $q.when(service.currentUser);
            } else {
                var url = APP_CONFIG.apiHostUrl + '/api/crud/users/current';
            	var config = {
            		headers:  {
	                   'X-Auth-Token': TokenStorage.retrieve()
	                }
                };
                return $http.get(url, config).then(function(response) {
                    service.currentUser = response.data;
                    return service.currentUser;
                });
            }

        },
        
        requestCurrentOrganization: function() {
            if ( service.isAuthenticated() ) {
                return $q.when(service.currentUser);
            } else {
                var url = APP_CONFIG.apiHostUrl + '/api/crud/organizations/'+service.currentUser.organizationId;
            	var config = {
            		headers:  {
	                   'X-Auth-Token': TokenStorage.retrieve()
	                }
                };
                return $http.get(url, config).then(function(response) {
                    return response.data.data;
                });
            }

        },

        //CurrentUser information
        currentUser: null,
        
        isAuthenticated: function(){
            return !!service.currentUser;
        },
        
        isAdmin: function() {
            return !!(service.currentUser && (service.currentUser.role=="ROLE_ADMIN"));
        }
    };


    return service;

});