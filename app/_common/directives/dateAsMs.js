app.directive('dateAsMs', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope,elem,attrs,ngModelCtrl) {
      ngModelCtrl.$parsers.push(function(value){
        if (value && value.getTime) {
          return value.getTime();
        } else {
          return value;
        }
      });
    }
  };
});