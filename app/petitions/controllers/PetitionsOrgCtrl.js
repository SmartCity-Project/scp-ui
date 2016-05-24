"use strict";
angular.module('app.petitions').controller('PetitionsOrgCtrl', 
		function ($scope, $q, $state, $modal, Security, PetitionService, 
                   TagService) {

    $scope.showForm = false;
    $scope.organizationId = null;
    $scope.petitions = [];
	$scope.PetitionSearchCriteria = {
        organizationId: null,
        petitionStatus: null,
        goal: null,
        endBy: null,
        tags: []
    };
    
    $scope.petition = {};
    
    $scope.newPetition = {
        id: null,
        organizationId: null,
        title: null,
        description: null,
        tags: [],        
        endBy: null,
        goal: null
    };
    
    function findIndexById(id) {
        return $scope.petitions.map(function(item) { return item.id; }).indexOf(id);;
    }
        
    function initPaginationParams(){
        $scope.pFeedLimit = 0;
        $scope.pageIndex = 0;
        $scope.pageSize = 10;
    }
    
    $scope.remove = function(index, pid) {
        PetitionService.removePetition(pid, function(response){
            if(response.data==false) {
                $scope.showWindowMessage("Petition not deleted", "#C46A69");
            } else {
                $scope.petitions.splice(index, 1);  
                $scope.showWindowMessage("Petition deleted", "#5F895F");
            }
        });
    }
    
    $scope.edit = function(ePetition) {
        $scope.petition = ePetition;
        $scope.showForm = true;
    }
    
    $scope.createForm = function() {
        $scope.petition = $scope.newPetition;
        $scope.showForm = true;
    }
    
    $scope.cancelForm = function() {
        $scope.showForm = false;
    }
    
    $scope.createPetition = function() {
        if($scope.organizationId) {
            $scope.petition.organizationId = $scope.organizationId;
            
            PetitionService.savePetition($scope.petition, function(response){         
                if(response.data.error!=null) {
                    $scope.showWindowMessage(response.data.error, "#C46A69");
                } else {
                    $scope.showWindowMessage("Congratulations! You have posted an petition", "#5F895F");
                    var index = null;
                    if($scope.petition.id!=null) {
                        var index = findIndexById($scope.petition.id);
                    }
                    
                    if(index!=null) {
                        $scope.petitions[index] = response.data;
                    } else {
                        $scope.petitions.push(response.data);
                    }
                    
                    $scope.cancelForm();
                }
            }); 
        }
        else {
            $scope.showWindowMessage("you are not an organization user", "#C46A69");
        }
    }
    
    $scope.prevPage = function() {
        if($scope.pageIndex>0) {
            $scope.pageIndex = $scope.pageIndex - 1;
            $scope.loadPetitions(true);
        } else if($scope.pageIndex==0) {
            $scope.pageIndex = 0;
            $scope.loadPetitions(true);
        }
    }
    
     $scope.nextPage = function() {
        if($scope.pageIndex>=0) {
            $scope.pageIndex = $scope.pageIndex + 1;
            $scope.loadPetitions(true);
        }
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
    
        $scope.$watch(function() {
            return Security.currentUser;
            }, function(currentUser) {
                if(currentUser) {
                    initPaginationParams();

                    if(currentUser.organizationId) {
                        $scope.PetitionSearchCriteria.organizationId = currentUser.organizationId;
                        $scope.organizationId = currentUser.organizationId;
                    }

                    $scope.loadPetitions(true);
                }
        });
    }
    
    //init the controller
    init();
});
