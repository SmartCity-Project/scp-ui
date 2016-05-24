"use strict";
angular.module('app.profile').controller('ContactCtrl', 
		function ($scope, $q, $state, security, OrganizationService) {
    
    
    $scope.edit = function(eContact) {
        $scope.showForm = true;
        $scope.contact = eContact;
    }
    
    $scope.remove = function(cid) {
        OrganizationService.removeContact(cid, function(response){
            alert("deleted")
        });
    }
    
    $scope.createForm = function() {
        $scope.showForm = true;
    }
    
    $scope.cancelForm = function() {
        $scope.showForm = false;
    }
    
    $scope.createContact = function() {
        if(security.currentUser.organizationId) {
            console.log($scope.contact);
            OrganizationService.saveContact(security.currentUser.organizationId, $scope.contact, function(response){         
                if(response.data.error!=null) {
                    showWindowMessage(response.data.error, "#C46A69");
                } else {
                    showWindowMessage("Congratulations! You have posted an contact", "#5F895F");
                    $scope.petitions.push(response.data);
                    $scope.showForm = false;
                }
            }); 
        }
        else {
            showWindowMessage("you are not an organization user", "#C46A69");
        }
    }
    
});
    