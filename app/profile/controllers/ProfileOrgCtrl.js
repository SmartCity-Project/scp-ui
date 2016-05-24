"use strict";
angular.module('app.profile').controller('ProfileOrgCtrl', 
		function ($scope, $q, $state, $modal, Security, $stateParams,
                   OrganizationService, PetitionService, 
                   VoteService, CommentService, uiGmapGoogleMapApi, uiGmapIsReady) {
    
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
    
    $scope.petitions = [];
    
    function initPaginationParams(){
        $scope.pFeedLimit = 0;
        $scope.pageIndex = 0;
        $scope.pageSize = 10;
    }
    
    var api;
    uiGmapGoogleMapApi.then(function (googleMaps) {
        api = googleMaps;
    });
    
	$scope.PetitionSearchCriteria = {
        "organizationId": null
    };
    
    function findIndexById(id) {
        return $scope.petitions.map(function(item) { return item.id; }).indexOf(id);
    }
    
    $scope.loadPetitions = function(clearList) {
        if(clearList) {
            initPaginationParams();
        }
        if($scope.PetitionSearchCriteria.organizationId==null) {
            return;
        }
        
        PetitionService.searchPetitions(
            $scope.PetitionSearchCriteria, 
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
                                //$scope.petitions[index] = response.data.data[i];
                            } else {
                                $scope.petitions.push(response.data.data[i]);
                                $scope.pFeedLimit += 1;
                            }
                        }
                    }
                    else{
                        initPaginationParams();
                        $scope.petitions = response.data.data;
                        $scope.pageIndex = response.data.pageIndex;
                        $scope.pageSize = response.data.pageSize;
                        $scope.pFeedLimit += $scope.petitions.length;
                    }                   
                }
            },
            function(response) {
                alert("loadPetitionsErrorCallBack");
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
     
    function initOrganizationInfo() {
        $scope.profile = {};
        $scope.profile.id = $stateParams.id;
        $scope.PetitionSearchCriteria.organizationId = $scope.profile.id;
        
        OrganizationService.getOrganizationById($scope.profile.id, function(response) {
            if(response.data.error!=null) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.profile = response.data;
                
                if($scope.profile.address!=null) {
                    if($scope.profile.address.location!=null) {
                        setLocation($scope.profile.address.location.coordinates[0], 
                                    $scope.profile.address.location.coordinates[1]);
                    }
                }               
            }

        });
        
        initPaginationParams();
        $scope.loadPetitions(true);
        
    }
    
    $scope.petitionSign = function(index, pid) {
         PetitionService.sign(pid, function(response){
             $scope.petitions[index].aggregatedSignatures = response.data.aggregatedSignatures;
         });
    }
    
    $scope.vote = function(index, documentId, documentType, voteType) {
        VoteService.vote(documentType, documentId, voteType, 
            function(response) {
                $scope.petitions[index].aggregatedVotes = response.data.aggregatedVotes;
        });
    }
    
    $scope.showComments = function(index, documentType, discussionId) {
        CommentService.find(documentType, discussionId, 
                function(response) {
            $scope.petitions[index].comments = response.data.comments;
        });
    }
    
    $scope.comment = function(index, commentText, documentType, discussionId) {
        
        CommentService.saveComment(commentText, discussionId, documentType,
                function(response) {
            $scope.petitions[index].aggregatedComments = response.data.aggregatedComments;
            $scope.commentText = null;
            $scope.showComments(index, discussionId);
        });
    }
    
    function init() {
        initOrganizationInfo();
    }
    
    //init the controller
    init();
});