"use strict";
angular.module('app.auth').controller('AuthCtrl', function ($scope, $location, $compile, $state, Security) {
	$scope.authenticated = false;
	$scope.token; // For display purposes only
	
	var orgCheck = false;
	$("#orgCheck").on("click", function(e) {
		
		if(orgCheck===false) {
			$("#smcity-register [name='crendentialsInfo']").after($compile(
					'<fieldset name="organizationInfo">'
			        +'<h3>Organization info</h3>'
			        +'<br>'
			        +'<section>'
			        +'<label class="input"> <i class="icon-append fa fa-user"></i>'
			        +'<input type="text" name="orgName" ng-model="userRegister.organization.name" placeholder="Name" required="true">'
			        +'</section>'
			        +'<section>'
			        +'<label class="input"> <i class="icon-append fa fa-globe"></i>'
			        +'<input type="url" name="url" ng-model="userRegister.organization.url" placeholder="Url">'
			        +'</section>'
			        +' </fieldset>')($scope));
			
			orgCheck = true;
		} else {
			$("#smcity-register [name='organizationInfo']").remove();
			$scope.userRegister.organization = null;
			orgCheck = false;
		}
		
	});
	
	$scope.login = function() {

//		if (loginForm.$valid) {
	        //Clear any errors
	        $scope.authError = null;
	
	        //Attempt Login
	        Security.login($scope.credentials.email,
                           $scope.credentials.password).then(function(loggedIn) {
	            if (!loggedIn) {
	                $scope.authError = 'Credentials are not valid';	  
                    scope.showWindowMessage($scope.authError, "#C46A69");
	            } else {
                    $scope.isAdmin = Security.isAdmin();                    
                    $location.path("/");
	            	//$state.go('app.dashboard');
	            }
	        }, function(x) {
	            // problem with request to server
	            $scope.authError = 'Login Server offline, please try later';
                scope.showWindowMessage($scope.authError, "#C46A69");
	        });
//		}
    };
    
    $scope.logout = function() {
    	Security.logout();
    };
    
    $scope.register = function() {
        
        if(document.getElementById('terms').checked) {
            Security.register($scope.userRegister, function(response){
                if(response.data.error!=null) {
                    $scope.showWindowMessage(response.data.error, "#C46A69");
                } else {
                    $scope.showWindowMessage("Congratulations! You have created yourr account", "#5F895F");
                    $location.path("/login");
                }
        });
        } else { 
            $scope.showWindowMessage("Please agree with Terms and Conditions", "#C46A69");
        }
        
    	 	
    };

})
