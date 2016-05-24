"use strict";
angular.module('app.auth').directive('loginInfo', function($compile, Security){

    return {
        restrict: 'A',
        templateUrl: 'app/auth/directives/login-info.tpl.html',
        scope: true,
        link: function($scope, $element){
            
            $scope.$watch(function() {
                return Security.currentUser;
              }, function(currentUser) {
                if(currentUser) {
                    $scope.user = currentUser;

                    var profileLink = $element.find("#profileLink");

                    if($scope.user.role == "ROLE_ADMIN") {   
                        profileLink.attr("ui-sref", "app.profile({type:'organization', id:'"+$scope.user.organizationId+"'})");
                    } else {         
                        profileLink.attr("ui-sref", "app.profile({type:'user', id:'"+$scope.user.id+"'})");
                    }

                    $compile(profileLink)($scope);
                }
            });

           
        }
    }
})
