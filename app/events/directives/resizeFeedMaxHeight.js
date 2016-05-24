"use strict";
app.directive('resizeMaxHeight',['$timeout', function($timeout) {

 return {
        restrict: 'A',
        link: function (scope, element, attrs) {      
            $timeout(function(){
                          
                var targetElem = element[0];
                var parentElem = targetElem.parentNode;
                
                var maxHeight = ($(window).height()*0.07) + 'px';   
                console.log(maxHeight);
                $(targetElem).css('max-height',maxHeight);
            });    
            
            
        }
    };
}]);
