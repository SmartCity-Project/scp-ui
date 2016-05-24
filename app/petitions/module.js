"use strict";
angular.module('app.petitions', [
    'ui.router',
    'ngResource',
    'infinite-scroll',
    'ngTagsInput',
    'textAngular',
    'bsTable'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('app.petitions', {
            url: '/petitions',
            views: {
            	"content@app": {
                    templateUrl: "app/petitions/partials/petitions.users.html",
                    controller: 'PetitionsCtrl'
                }
            },
            data:{
                title: 'Petitions'
            },
            resolve: {
                srcipts: function(lazyScript){
                    return lazyScript.register([
                        "build/vendor.ui.js",
                    ])
                }
            }
        })
        .state('app.petitions.organization', {
            url: '/manage',
            views: {
            	"content@app": {
                    templateUrl: "app/petitions/partials/petitions.org.html",
                    controller: 'PetitionsOrgCtrl'
                }
            },
            data:{
                title: 'Manage Petitions'
            },
            resolve: {
                srcipts: function(lazyScript){
                    return lazyScript.register([
                        "build/vendor.ui.js"                    ])

                }
            }
        })
});