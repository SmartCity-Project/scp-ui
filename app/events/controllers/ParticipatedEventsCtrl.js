"use strict";
angular.module('app.events').controller('ParticipatedEventsCtrl', 
		function ($scope, $q, $compile, $state, Security,
                   EventService, TagService) {
	
    $scope.event = {};
    $scope.events = [];
    
    $scope.EventSearchCriteria = {
        organizationId: null,
        eventState: null,
        locations: [],
        tags: []
    };   
    
    function initPaginationParams() {
        $scope.eFeedLimit = 0;
        $scope.pageIndex = 0;
        $scope.pageSize = 4;
    } 
    
    function findIndexById(id) {
        return $scope.events.map(function(item) { return item.id; }).indexOf(id);
    }
    
    $scope.edit = function(item) {
        $scope.showForm = true;
        $scope.event = item;
    }
    
    $scope.cancelForm = function() {
        $scope.showForm = false;
    }
    
     $scope.prevPage = function() {
        if($scope.pageIndex>0) {
            $scope.pageIndex = $scope.pageIndex - 1;
            $scope.loadEvents(true);
        } else if($scope.pageIndex==0) {
            $scope.pageIndex = 0;
            $scope.loadEvents(true);
        }
    }
    
     $scope.nextPage = function() {
        if($scope.pageIndex>=0) {
            $scope.pageIndex = $scope.pageIndex + 1;
            $scope.loadEvents(true);
        }
    }

    $scope.loadEvents = function(clearList) {
        if(clearList) {
            initPaginationParams();
        }
        
        if($scope.EventSearchCriteria.organizationId==null) {
            return;
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
                        $scope.eFeedLimit = 0;
                        $scope.pageIndex = 0;
                        $scope.pageSize = 4;
                        $scope.events = response.data.data;
                        $scope.eFeedLimit += $scope.events.length;
                    }                   
                }
            },
            function(response) {
                alert("loadEventsErrorCallBack");
            });	
    }
    
    $scope.participate = function(eventId) {
        EventService.participate(eventId, function(response) {
            if(response.data.error!=null) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.showWindowMessage("You unparticipate this event", "#5F895F");
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
    
    $scope.eventStates = [{name:"Opened", value:"opened"},
        {name:"On going", value:"ongoing"},
        {name:"Closed", value:"closed"}];
    
    $scope.modifyEventState = function(eventId, state) {
        EventService.edit(eventId, state, function(response) {});
    }
        
    function init() {
        
        $scope.$watch(function() {
            return Security.currentUser;
            }, function(currentUser) {
                if(currentUser) {
                    if(currentUser.organizationId) {
                        $scope.EventSearchCriteria.organizationId = currentUser.organizationId;
                        $scope.events = [];
                        $scope.loadEvents(true);
                    }
                }
         });
    }
   
    // init the controller
    init();

});