"use strict";
angular.module('app.events').controller('EventsFeedCtrl', 
		function ($scope, EventService) {

    $scope.events = [];
    $scope.pageIndex = 0;
    $scope.pageSize = 4;
    $scope.eFeedLimit = 0;    
    
    $scope.EventSearchCriteria = {
        eventState: null,
        locations: [],
        tags: []
    };   
    
    function findIndexById(id) {
        return $scope.events.map(function(item) { return item.id; }).indexOf(id);
    }

    $scope.loadEvents = function(clearList) {
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
    
    function init() {
        $scope.events = [];
        $scope.loadEvents(true);
    }
    
    init();

});
