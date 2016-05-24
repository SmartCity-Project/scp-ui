'use strict';
angular.module('app.services.token', [])
.factory('TokenStorage', function() {
	var storageKey = 'auth_token';
	return {		
		store : function(token) {
			return localStorage.setItem(storageKey, token);
		},
		retrieve : function() {
			return localStorage.getItem(storageKey);
		},
		clear : function() {
			return localStorage.removeItem(storageKey);
		}
	};
}).factory('TokenAuthInterceptor', function($q, TokenStorage) {
	return {
		request: function(config) {
			var authToken = TokenStorage.retrieve();
			if(authToken) {
				config.headers['X-Auth-Token'] = authToken;
			}
			return config;
		}
	};
}).config(function($httpProvider) {
	$httpProvider.interceptors.push('TokenAuthInterceptor');
});