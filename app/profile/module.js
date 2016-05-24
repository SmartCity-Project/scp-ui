"use strict";

angular.module('app.profile', [
    'ui.router',
    'ngResource',
    'ngTagsInput',
    'textAngular',
    'uiGmapgoogle-maps',
    'angular-google-maps-geocoder',
    'bsTable'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('app.profile', {
            url: '/profile/:type?id',
            views: {
                "content@app": {
                    templateUrl: function ($stateParams){
                        return "app/profile/"+$stateParams.type+"/views/profile.html";
                    }
                }
            },
            data:{
                title: 'Profile'
            },
            resolve: {
                srcipts: function(lazyScript){
                    return lazyScript.register([
                        "build/vendor.ui.js"
                    ])

                }
            }
        })
        .state('app.settings', {
                url: '/manage/profile',
                views: {
                    "content@app": {
                        templateUrl: "app/profile/views/settings.html",
                        controller: 'SettingsCtrl'
                    }
                },
                data:{
                    title: 'Settings'
                },
                resolve: {
                    srcipts: function(lazyScript){
                        return lazyScript.register([
                            "build/vendor.ui.js",
                            "//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&components=country:GR"
                        ])

                    }
                }
            });
});