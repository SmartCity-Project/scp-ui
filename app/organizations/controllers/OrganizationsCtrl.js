"use strict";
angular.module('app.organizations').controller('OrganizationsCtrl', 
		function ($scope, $q, Security, OrganizationService, TagService) {
    
    $scope.loadOrganizations = function() {
        OrganizationService.getOrganizationList(function(response) {
            if(response.data.error) {
                $scope.showWindowMessage(response.data.error, "#C46A69");
            } else {
                $scope.organizations = response.data.data;
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
    
    function init() {
        $scope.organizations = [];
        $scope.loadOrganizations();
    }
    
    //init the controller
    init();
});
