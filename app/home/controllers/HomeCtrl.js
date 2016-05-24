'use strict';

angular.module('app.home')
    .controller('HomeController', function ($scope, UserService, 
                        OrganizationService, EventService, PetitionService) {
    
    $scope.scpAggregations = {
        totalUsers: null,
        totalOrganizations: null,
        totalPetitions: null,
        totalEvents: null
    }
    
    $scope.countUsers = function() {
        UserService.count(function(totalUsers) {
            $scope.scpAggregations.totalUsers = totalUsers;
        });
    }

    $scope.countEvents = function() {
        EventService.count(function(totalEvents) {
            $scope.scpAggregations.totalEvents = totalEvents;
        });
    }

    $scope.countOrganizations = function() {
        OrganizationService.count(function(totalOrganizations) {
            $scope.scpAggregations.totalOrganizations = totalOrganizations;
        });
    }
    $scope.countPetitions = function() {
        PetitionService.count(function(totalPetitions) {
            $scope.scpAggregations.totalPetitions = totalPetitions;
        });
    }
    
    
    function init() {
        $scope.countUsers();
        $scope.countOrganizations();
        $scope.countEvents();
        $scope.countPetitions();
    }
    
    init();
});