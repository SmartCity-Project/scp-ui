app.directive('stringToTimestamp', function() {
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ngModel) {
            // view to model
            ngModel.$parsers.push(function(value) {
                return Date.parse(value);
            });
        }
    }
});
