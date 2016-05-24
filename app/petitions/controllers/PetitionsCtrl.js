"use strict";
angular.module('app.petitions').controller('PetitionsCtrl', 
		function ($scope, $q, $state, $modal, Security, PetitionService, 
                   TagService, VoteService, CommentService) {

    $scope.petitions = [];
	$scope.PetitionSearchCriteria = {
        organizationId: null,
        petitionStatus: null,
        goal: null,
        endBy: null,
        tags: []
    };
    
    $scope.petition = {
        organizationId: null,
        title: null,
        description: null,
        tags: [],        
        endBy: null,
        goal: null
    };
        
    function initPaginationParams(){
        $scope.pFeedLimit = 0;
        $scope.pageIndex = 0;
        $scope.pageSize = 10;
    }
    
    function findIndexById(id) {
        return $scope.petitions.map(function(item) { return item.id; }).indexOf(id);
    }
    
    $scope.loadPetitions = function(clearList) {
        if(clearList) {
            initPaginationParams();
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
    

    $scope.petitionStatusList = [{name:"All", value:null},
        {name:"Started", value:"started"},
        {name:"On going", value:"ongoing"},
        {name:"Completed", value:"completed"}];
    
    
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
    
    function init() {
        initPaginationParams();
        $scope.loadPetitions(true);
    }
    
    //init the controller
    init();
});
