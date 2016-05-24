"use strict";
angular.module('app.events')
       .controller('EventFormModalCtrl', 
                   function ($scope, $q, $modalInstance, Domain, 
                              EventService, TagService, uiGmapGoogleMapApi, 
                              uiGmapIsReady, geocoder) {
        
    $scope.map = { 
        center: { 
            latitude: 39, 
            longitude: 22 }, 
        zoom: 4    
    };
    
    $scope.markers = [];
    $scope.readyForMap = true;
    $scope.control = {};
    
    $scope.location = {
        id:0,
        latitude: null,
        longitude: null,
        options: {
            draggable: true
            //title: handlerArgs[0].latLng.toUrlValue()
        }
    };
    
    $scope.marker_events = {
                
        drag: function(gMarker, eventName, handlerArgs) {
            $scope.$apply(function () {
                $scope.changeLocation(handlerArgs.latitude, handlerArgs.longitude);
                $scope.markers.push($scope.location);
            });
        }
    }
      
    $scope.map_events = {
        click: function(map, eventName, handlerArgs) {
            $scope.$apply(function () {
                $scope.changeLocation(handlerArgs[0].latLng.lat(), handlerArgs[0].latLng.lng());
                $scope.markers.push($scope.location);
            });
        }
    };
                                        
    $scope.changeLocation = function(lat,lon){
        $scope.location.latitude= lat;
        $scope.location.longitude= lon;  
        //$scope.map.center = $scope.location
    };
    
    $scope.event = {
        title: null,
        description: null,
        tags: [],        
        location: {
            type: "Point",
            coordinates: []
        }
    };
    
    $scope.selectedResult = function(item) {  
        $scope.changeLocation(item.geometry.location.lat(), item.geometry.location.lng());
        $scope.markers.push($scope.location);
    }
    
    uiGmapIsReady.promise().then(function(maps, map_events) {
        google.maps.event.trigger(map_events);
    });
    
    this.closeModal = function(){
        $modalInstance.dismiss();
    }
    
    $scope.loadTags = function(query) {
        var d = $q.defer();      
        TagService.find(query, function(response) {
            if(response.data.error!=null) {
                alert(response.data.error);
            }else {
                d.resolve(response.data);
            }
        });
        return d.promise;
    }
    
    $scope.wizardEventFormCompleteCallback = function(wizardData){
        $scope.event.location.coordinates = [];
        $scope.event.location.coordinates.push($scope.location.longitude);
        $scope.event.location.coordinates.push($scope.location.latitude);
        EventService.createEvent($scope.event, function(response){
            if(response.data.error!=null) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.showWindowMessage( "Congratulations! You have posted an event", "#5F895F");

                $modalInstance.dismiss();
            }
        }); 
    };
    
});