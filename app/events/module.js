"use strict";

angular.module('app.events', [
    'ui.router',
    'ngResource',
    'uiGmapgoogle-maps',
    'angular-google-maps-geocoder',
    'infinite-scroll',
    'ngTagsInput'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('app.events', {
            url: '/events',
            views: {
            	"content@app": {
                    templateUrl: 'app/events/views/events.html',
                    controller: 'EventsCtrl'
                }
            },
            data:{
                title: 'Events'
            },
            resolve: {
                srcipts: function(lazyScript){
                    return lazyScript.register([
                        "build/vendor.ui.js",
                        "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&components=country:GR"
                    ])

                }
            }
        })
        .state('app.events.participations', {
            url: '/participations',
            views: {
            	"content@app": {
                    templateUrl: 'app/events/partials/events.org.tpl.html',
                    controller: 'ParticipatedEventsCtrl'
                }
            },
            data:{
                title: 'Participations'
            },
            resolve: {
                srcipts: function(lazyScript){
                    return lazyScript.register([
                        "build/vendor.ui.js"
                    ])

                }
            }
        })
});

