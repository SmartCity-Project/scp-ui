"use strict";
angular.module('app.events').controller('EventsCtrl', 
		function ($scope, $q, $compile, $state, $modal, Security, OrganizationService,
                   EventService, VoteService, CommentService, TagService, LocationService,
                   uiGmapGoogleMapApi, uiGmapIsReady, geocoder) {
	
    $scope.map = {
        center: {
            latitude: 39,
            longitude: 22
        },
        clusterOptions: {
            imageExtension: 'png',
            imagePath: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
        },
        zoom: 6,
        canUseCreateEventBtn: false
    };

    $scope.models = [];

    //$scope.busy = false;
	
    $scope.locations = [];


    function initPaginationParams() {
        $scope.pFeedLimit = 0;
        $scope.pageIndex = 0;
        $scope.pageSize = 4;
    }   
    
    $scope.EventSearchCriteria = {
        eventState: null,
        locations: [],
        tags: []
    };   
    
    function findIndexById(id) {
        return $scope.events.map(function(item) { return item.id; }).indexOf(id);
    }

    $scope.loadEvents = function(clearList) {
        if(clearList) {
            initPaginationParams();
        }
        EventService.searchEvents(
            $scope.EventSearchCriteria, 
            $scope.pageIndex, 
            $scope.pageSize,
            function(response) {
                if(response.data.error!=null) {
                    $scope.showWindowMessage(response.data.error, "#C46A69");
                }

                if(response.data!=null) {
                    if(!clearList) {
                        $scope.pageIndex = response.data.pageIndex;
                        $scope.pageSize = response.data.pageSize;

                        for(var i = 0; i < response.data.data.length; i++) { 
                            var index = findIndexById(response.data.data[i].id);
                            
                            if(index!=undefined && index>=0) {
                                //$scope.events[index] = response.data.data[i];
                            } else {
                                $scope.events.push(response.data.data[i]);
                                $scope.eFeedLimit += 1;
                            }
                        }
                    }
                    else{
                        initPaginationParams();
                        $scope.events = response.data.data;
                        $scope.eFeedLimit += $scope.events.length;
                        $scope.pageIndex = response.data.pageIndex;
                        $scope.pageSize = response.data.pageSize;
                    }   
                }
            },
            function(response) {
                alert("loadEventsErrorCallBack");
            });	
    }
    
    uiGmapIsReady.promise().then(function(map_events) {
        google.maps.event.trigger(map_events, "resize");
    });
    
    $scope.openModal = function () {
        $modal.open({
          controller: 'EventFormModalCtrl as modal',
          templateUrl: 'app/events/partials/eventModal.html'
        });
    };
    
    $scope.participate = function(eventId) {
        EventService.participate(eventId, function(response) {
            if(response.data.error!=null) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.showWindowMessage("You are participator", "#5F895F");
            }
        });
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
    
    $scope.eventStates = [{name:"All", value:null},
        {name:"Opened", value:"opened"},
        {name:"On going", value:"ongoing"},
        {name:"Closed", value:"closed"}];
    
    $scope.vote = function(index, documentId, documentType, voteType) {
        VoteService.vote(documentType, documentId, voteType, 
            function(response) {
                $scope.events[index].aggregatedVotes = response.data.aggregatedVotes;
        });
    }
    
    $scope.showComments = function(index, documentType, discussionId) {
        CommentService.find(documentType, discussionId, 
                function(response) {
            console.log($scope.events);
            $scope.events[index].comments = response.data.comments;
        });
    }
    
    $scope.comment = function(index, commentText, documentType, discussionId) {
        CommentService.saveComment(commentText, discussionId, documentType,
                function(response) {
            $scope.events[index].aggregatedComments = response.data.aggregatedComments;
            $scope.commentText = null;
            $scope.showComments(index, discussionId);
        });
    }
        
    var gmap;
    uiGmapGoogleMapApi.then(function (googleMaps) {
        gmap = googleMaps;
    });
    
    function init() {
        $scope.currentEvent = false;
        $scope.events = [];
        initPaginationParams();
        
        //$scope.loadEvents(true);
        
        $scope.$watch(function() {
            return Security.currentUser;
            }, function(currentUser) {
                if(currentUser) {
                    var organizationId = currentUser.organizationId;
                    $scope.map.canUseCreateEventBtn = !Security.isAdmin();
                    
                    if(Security.isAdmin()) {
                        OrganizationService.getFavoriteLocations(
                           organizationId, function(response) {
                                var favoriteLocations = response.data.favoriteLocations;
                               
                                if(favoriteLocations.length==0) {
                                    $scope.showWindowMessage("You must choose locations from settings", "#C46A69");
                                    return;
                                }
                    
                                for(var i=0; i<favoriteLocations.length; i++) {
                                    favoriteLocations[i].multiPolygon = null;
                                    $scope.EventSearchCriteria.locations.push(favoriteLocations[i]);
                                }    
                                
                                OrganizationService.getFavoriteTags(
                                    organizationId, function(response) {
                                
                                        var favoriteTags = response.data.favoriteTags;
                                        
                                        if(favoriteTags.length==0) {
                                            $scope.showWindowMessage("You can choose tags for more adaptive search");
                                        }

                                        for(var i=0; i<favoriteTags.length; i++) {
                                            $scope.EventSearchCriteria.tags.push(favoriteTags[i]);
                                        }    

                                        $scope.loadEvents(true);
                                        
                                });
                        });
                    } else {
                        $scope.loadEvents(true);
                    }
                }
        });
    }
   
    // init the controller
    init();

});