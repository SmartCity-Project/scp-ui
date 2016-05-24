"use strict";
angular.module('app.organizations', [
    'ui.router',
    'ngResource',
    'infinite-scroll',
    'ngTagsInput',
    'textAngular'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('app.organizations', {
            url: '/organizations',
            views: {
            	"content@app": {
                    templateUrl: "app/organizations/views/organizations.html",
                    controller: 'OrganizationsCtrl'
                }
            },
            data:{
                title: 'Organizations'
            },
            resolve: {
                srcipts: function(lazyScript){
                    return lazyScript.register([
                        "build/vendor.ui.js",
                    ])
                }
            }
        })
});