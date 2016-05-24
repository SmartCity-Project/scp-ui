"use strict";
angular.module('app.profile').controller('SettingsCtrl', 
		function ($scope, $q, $state, Security, TagService, 
                   LocationService, OrganizationService, uiGmapGoogleMapApi, uiGmapIsReady) {
    
    var organizationId = null;
    
    $scope.map = { 
        center: { 
            latitude: 39, 
            longitude: 22 }, 
        zoom: 4    
    };
    $scope.markers = [];
    $scope.location = {
        id:0,
        latitude: null,
        longitude: null,
        options: {
            draggable: true
            //title: handlerArgs[0].latLng.toUrlValue()
        }
    };
    
    $scope.organization = [{
         id: null,
         name: "",
         description: null,
         url: null,
         address: {
             city: "",
             country: "",
             street: "",
             number: "",
             poBox: "",
             location: {
                 type: "Point",
                 coordinates: []
             }
         },
         favoriteLocations: [],
         favoriteTags: []
     }];
    
     function changeLocation(lat, lng) {     
        if($scope.organization.address==null) {
            $scope.organization.address = {
                 city: "",
                 country: "",
                 street: "",
                 number: "",
                 poBox: "",
                 location: {
                     type: "Point",
                     coordinates: []
                 }
             };
        } else if($scope.organization.address.location==null) {
            $scope.organization.address.location = {
                type: "Point",
                coordinates: []
            }
        }
         
        $scope.organization.address.location.coordinates = [];
        $scope.organization.address.location.coordinates.push(lat);
        $scope.organization.address.location.coordinates.push(lng);
         
        $scope.location.latitude= lat;
        $scope.location.longitude= lng;  
     }
     
     $scope.selectedResult = function(item) { 
        changeLocation(item.geometry.location.lat(), item.geometry.location.lng());
        $scope.setAddress(item);
        $scope.markers.push($scope.location);
     };

     $scope.setAddress = function(item) {
         
        for(var i=0; i<item.address_components.length; i++) {
            
            if(item.address_components[i]!=null) {
                
                var address_types = item.address_components[i].types;
            			
                for(var t=0; t<address_types.length; t++) {
                    var type = address_types[t];       			

                    if(type == "country") {
                        $scope.organization.address.country = item.address_components[i].long_name;
                    }
                    if(type == "locality") {
                        $scope.organization.address.city = item.address_components[i].long_name;        
                    }
                    if(type == "route") {
                        $scope.organization.address.street = item.address_components[i].long_name;
                    }
                    if(type == "street_number") {
                        $scope.organization.address.number = item.address_components[i].long_name;
                    }
                    if(type == "postal_code") {
                        $scope.organization.address.poBox = item.address_components[i].long_name;
                    }
                }
            }
        }
        console.log($scope.organization);

     }
     
     function initOrganizationFavorites() {
         if(organizationId) {
            $scope.organization.id = organizationId;
            
            OrganizationService.getOrganizationById($scope.organization.id, function(response) {
                if(response.data.error!=null) {
                    $scope.showWindowMessage(response.data.error, "#C46A69");
                } else {
                    $scope.organization = response.data;
                    if($scope.organization.address!=null) {
                        if($scope.organization.address.location!=null) {
                            $scope.location.latitude = $scope.organization.address.location.coordinates[0];
                            $scope.location.longitude = $scope.organization.address.location.coordinates[1];  
                            $scope.map.center.latitude = $scope.location.latitude;
                            $scope.map.center.longitude = $scope.location.longitude;
                            $scope.markers.push($scope.location);
                        }
                    }
                }
                    
            });
        }
        else {
            $scope.showWindowMessage("you are not an organization user", "#C46A69");
        }
     }
     
     $scope.saveFavoriteLocaocation = function(location, state) {
        if(organizationId) {
            $scope.organization.id = organizationId;
            
            if(state=="added") {
                OrganizationService.saveFavoriteLocation($scope.organization.id, location, function(response) {
                    if(response.data.error!=null) {
                        $scope.showWindowMessage(response.data.error, "#C46A69");
                    } else {
                        $scope.organization.favoriteLocations = response.data.favoriteLocations;
                    }
                });

            } else if(state=="removed") {
                 OrganizationService.removeFavoriteLocation($scope.organization.id, location.id, function(response) {
                    if(response.data.error!=null) {
                        $scope.showWindowMessage(response.data.error, "#C46A69");
                    } else {
                        $scope.organization.favoriteLocations = response.data.favoriteLocations;
                    }
                });
            }
        }
        else {
            $scope.showWindowMessage("you are not an organization user", "#C46A69");
        }
    }
     
    $scope.saveFavoriteTag = function(tag, state) {
        if(organizationId) {
            $scope.organization.id = organizationId;
            
            if(state=="added") {
                OrganizationService.saveFavoriteTag($scope.organization.id, tag, function(response) {
                    if(response.data.error!=null) {
                        $scope.showWindowMessage(response.data.error, "#C46A69");
                    } else {
                        $scope.organization.favoriteTags = response.data.favoriteTags;
                    }
                });

            } else if(state=="removed") {
                 OrganizationService.removeFavoriteTag($scope.organization.id, tag, function(response) {
                    if(response.data.error!=null) {
                        $scope.showWindowMessage(response.data.error, "#C46A69");
                    } else {
                        $scope.organization.favoriteTags = response.data.favoriteTags;
                    }
                });
            }
        }
        else {
            $scope.showWindowMessage("you are not an organization user", "#C46A69");
        }
    }
    
    $scope.saveOrgBaseInfo = function() {
        if(organizationId) {
            
            var baseInfo = {
                "id": $scope.organization.id,
                "name": $scope.organization.name,
                "description": $scope.organization.description,
                "url": $scope.organization.url,
                "address": $scope.organization.address
            }

            OrganizationService.editOrganizationBaseInfo(baseInfo, function(response) {
                if(response.data.error!=null) {
                    $scope.showWindowMessage(response.data.error, "#C46A69");
                } else {
                    //console.log(response.data);

                    $scope.showWindowMessage("Saved", "#5F895F");
                    $scope.organization.name = response.data.data.name;
                    $scope.organization.description = response.data.data.description;
                    $scope.organization.address = response.data.data.address;
                }
            });
    }
        else {
            $scope.showWindowMessage("you are not an organization user", "#C46A69");
        }
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
    
    $scope.loadLocations = function(query) {
        var d = $q.defer();      
        LocationService.findSimilar(query, false, function(response) {
            if(response.data.error!=null) {
                alert(response.data.error);
            }else {
                d.resolve(response.data);
            }
        });
        return d.promise;
    }
    
    function init() {
        
        $scope.$watch(function() {
            return Security.currentUser;
            }, function(currentUser) {
            if(currentUser) {
            if(currentUser.organizationId) {
                organizationId = currentUser.organizationId;
                initOrganizationFavorites();
            }
            }
        });

    }
    
    //init the controller
    init();
});