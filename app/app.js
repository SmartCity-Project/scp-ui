'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */
var app;
app = angular.module('app', [
    //'ngTagsInput',
    //'ngSanitize',
    'ngAnimate',
    'ngResource',
    'restangular',
    'base64',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'ui.slider',
    'infinite-scroll',
    'angular-confirm',
    
//    'uiGmapGoogleMapApiProvider',
//    'uiGmapgoogle-maps',
    
    // Smartadmin Angular Common Module
    'app.forms',
    'SmartAdmin',

    // App
    'app.services',
    'app.events',
    'app.petitions',
    'app.profile',
    'app.organizations',
    'app.auth',
    
    'app.layout',
    'app.maps',
    'app.misc',
    'app.smartAdmin',
    'app.home'
]);

app.config(function ($provide, $httpProvider) {

    $httpProvider.defaults.headers.delete = { 'Content-Type': 'application/json' };

//    GoogleMapApi.configure({
//        //key: 'your api key',
//        v: '3.17',
//        libraries: 'weather,geometry,visualization'
//      });
    
    // Intercept http calls.
    $provide.factory('ErrorHttpInterceptor', function ($rootScope, $location, $q, TokenStorage) {
        var errorCounter = 0;
        function notifyError(rejection){
            $.bigBox({
                title: rejection.status + ' ' + rejection.statusText,
                content: rejection.data,
                color: "#C46A69",
                icon: "fa fa-warning shake animated",
                number: ++errorCounter,
                timeout: 6000
            });
        }

        return {
            // On request failure
            requestError: function (rejection) {
                // show notification
                notifyError(rejection);

                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response failure
            responseError: function (rejection) {
            	// show notification
            	//notifyError(rejection);
            	
            	if (rejection.status == 401) {
            		TokenStorage.clear();   
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path("/login");
                } else  if (rejection.status == 403) {            		
                    $rootScope.$broadcast('event:forbidden');                   
            	}
            	
            	if(rejection.status == 401 || rejection.status == 403) {
            		var deferred = $q.defer();
            		return deferred.promise;
            	}        	
               
                notifyError(rejection);
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    });

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('ErrorHttpInterceptor');

})
.constant('APP_CONFIG', window.appConfig)
.run(function ($rootScope, $location, $state, $stateParams, Security) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.showWindowMessage = function(message, color){
        $.smallBox({
            title: message,
            color: color,
            timeout: 4000
        });
    }

    $rootScope.isAdmin = false;
        
//    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//        var requireLogin = toState.data.requireLogin;
//        
//        Security.requestCurrentUser().then(function(currentUser){
//            // keep user logged in after page refresh
//            if(currentUser!=null) {
//                //$rootScope.currentUser = currentUser;
//                $rootScope.isAdmin = Security.isAdmin();
//            }
//        });
//        
//        if(requireLogin&&!Security.isAuthenticated()) {
//            //alert(requireLogin);
//            event.preventDefault();
//            $location.path("/login");    
//        } else {
//            $location.path($location.path());
//        }
//    });

    Security.requestCurrentUser().then(function(currentUser){
        // keep user logged in after page refresh
        if(currentUser!=null) {
            //$rootScope.currentUser = currentUser;
            $rootScope.isAdmin = Security.isAdmin();
            $location.path($location.path());
        } else {
            $location.path("/login");    
        }

    });
    
    // editableOptions.theme = 'bs3';
});



