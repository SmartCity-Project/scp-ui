"use strict";
angular.module('app.events').directive('eventsFeed', function($timeout) {

 return {
        restrict: 'E',
        templateUrl: 'app/events/partials/eventsFeed.tpl.html',
        controller: 'EventsFeedCtrl',
        link: function (scope, element, attrs) {      

        }
    };
});