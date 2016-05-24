"use strict";

angular.module('app.auth').directive('registerForm', function ($rootScope, $compile) {
    return {
        restrict: 'A',
        template: 'app/auth/login/register.html',
        replace: true,
        link: function (scope, element) {
        	
            element.on('click', function(){
            	console.log(element);
            })
        }
    };
});
