"use strict";
angular.module('app.profile').controller('ProfileUserCtrl', 
		function ($scope, $q, $state, Security, $stateParams,
                   UserService, EventService, VoteService, CommentService) {
    
    $scope.profile = {};

    $scope.events = [];
    
    $scope.EventSearchCriteria = {
        authorId: null
    }; 
    
    function initPaginationParams(){
        $scope.eFeedLimit = 0;
        $scope.pageIndex = 0;
        $scope.pageSize = 10;
    }
    
    function findIndexById(id) {
        return $scope.events.map(function(item) { return item.id; }).indexOf(id);
    }
    
    $scope.loadEvents = function(clearList) {
        if(clearList) {
            initPaginationParams();
        }
        
        if($scope.EventSearchCriteria.authorId==null) {
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
                        initPaginationParams();
                        $scope.events = response.data.data;
                        $scope.pageIndex = response.data.pageIndex;
                        $scope.pageSize = response.data.pageSize;
                        $scope.eFeedLimit += $scope.events.length;
                    }                   
                }
            },
            function(response) {
                alert("loadEventsErrorCallBack");
            });	
    }
    
    function setLocation(lat, lng) {
        $scope.location.latitude = lat;
        $scope.location.longitude = lng;
        $scope.map.center.latitude = lat
        $scope.map.center.longitude = lng;
        $scope.map.zoom = 12;
        $scope.markers.push($scope.location);
    }
    
    $scope.reportDocument = function(documentType, documentId, reportType) {
        ReportService.report(documentType, documentId, reportType, function(response) {
            if(response.data.error!=null) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.showWindowMessage("You have reported document", "#5F895F");
            }
        });
    }
    
    $scope.vote = function(index, documentId, documentType, voteType) {
        VoteService.vote(documentType, documentId, voteType, 
            function(response) {
                $scope.events[index].aggregatedVotes = response.data.aggregatedVotes;
        });
    }
    
    $scope.showComments = function(index, documentType, discussionId) {
        CommentService.find(documentType, discussionId, 
                function(response) {
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
    
    function initUserInfo() {

        $scope.profile.id = $stateParams.id;
        $scope.EventSearchCriteria.authorId = $scope.profile.id;
        
        UserService.findUserById($scope.profile.id, function(response) {
            if(response.data.error!=null) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.profile = response.data;              
            }
        });
        
        initPaginationParams();
        $scope.loadEvents(true);
        
    }

    function init() {
        initUserInfo();
    }
    
    //init the controller
    init();
});